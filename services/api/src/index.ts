import Fastify from 'fastify'
import jwt from '@fastify/jwt'

export function buildServer() {
  const server = Fastify({ logger: true })

  // NOTE: replace with secure secret management in prod
  server.register(jwt, { secret: process.env.JWT_SECRET || 'changeme' })

  server.get('/health', async () => ({ status: 'ok', time: new Date().toISOString() }))

  // Use Prisma for persistence (Postgres)
  import { prisma } from './prisma'

  // List stations
  server.get('/stations', async (request, reply) => {
    const list = await prisma.station.findMany()
    return list
  })

  // Create station (public for now)
  server.post('/stations', async (request, reply) => {
    // @ts-ignore
    const body = request.body || {}
    if (!body.name) return reply.code(400).send({ error: 'name_required' })
    const s = await prisma.station.create({ data: { name: body.name, address: body.address || null, timezone: body.timezone || null } })
    return reply.code(201).send(s)
  })

  // Auth
  // Register (creates 'cashier' by default)
  server.post('/auth/register', async (request, reply) => {
    // @ts-ignore
    const body = request.body || {}
    if (!body.email || !body.password) return reply.code(400).send({ error: 'email_and_password_required' })
    try {
      const { registerUser } = await import('./auth')
      const u = await registerUser({ email: body.email, password: body.password, name: body.name, role: body.role })
      return reply.code(201).send({ id: u.id, email: u.email, role: u.role })
    } catch (err: any) {
      if (err.message === 'user_exists') return reply.code(409).send({ error: 'user_exists' })
      return reply.code(500).send({ error: 'internal_error' })
    }
  })

  // Login
  server.post('/auth/login', async (request, reply) => {
    // @ts-ignore
    const body = request.body || {}
    if (!body.email || !body.password) return reply.code(400).send({ error: 'email_and_password_required' })
    try {
      const { authenticateUser } = await import('./auth')
      const user = await authenticateUser(body.email, body.password)
      // Sign JWT (id, email, role)
      const token = await server.jwt.sign({ id: user.id, email: user.email, role: user.role })
      return reply.send({ token })
    } catch (err: any) {
      return reply.code(401).send({ error: 'invalid_credentials' })
    }
  })

  // Get station
  server.get('/stations/:id', async (request, reply) => {
    // @ts-ignore
    const id = request.params.id
    const s = await prisma.station.findUnique({ where: { id } })
    if (!s) return reply.code(404).send({ error: 'not_found' })
    return s
  })

  // Pumps
  server.get('/pumps', async (request, reply) => {
    // @ts-ignore
    const stationId = request.query?.stationId
    const where = stationId ? { where: { stationId } } : undefined
    const list = where ? await prisma.pump.findMany(where) : await prisma.pump.findMany()
    return list
  })

  server.post('/pumps', { preHandler: (await import('./auth')).requireRole(['admin','manager']) }, async (request, reply) => {
    // @ts-ignore
    const body = request.body || {}
    if (!body.stationId || typeof body.pumpNumber !== 'number') return reply.code(400).send({ error: 'stationId_and_pumpNumber_required' })
    const p = await prisma.pump.create({ data: { stationId: body.stationId, pumpNumber: body.pumpNumber, status: body.status || 'idle' } })

    // Emit realtime event for pumps
    try {
      const { publish } = await import('./events')
      publish({ type: 'pump.created', payload: p })
    } catch (err) {
      server.log.warn('failed to publish pump.created event', err)
    }

    return reply.code(201).send(p)
  })

  // Tanks
  server.get('/tanks', async (request, reply) => {
    const list = await prisma.tank.findMany()
    return list
  })

  server.post('/tanks', { preHandler: (await import('./auth')).requireRole(['admin','manager']) }, async (request, reply) => {
    // @ts-ignore
    const body = request.body || {}
    if (!body.stationId || !body.fuelType || typeof body.capacityLiters !== 'number') return reply.code(400).send({ error: 'stationId_fuelType_capacity_required' })
    const t = await prisma.tank.create({ data: { stationId: body.stationId, fuelType: body.fuelType, capacityLiters: body.capacityLiters, currentLiters: body.currentLiters ?? body.capacityLiters } })

    // Emit realtime event for tanks
    try {
      const { publish } = await import('./events')
      publish({ type: 'tank.created', payload: t })
    } catch (err) {
      server.log.warn('failed to publish tank.created event', err)
    }

    return reply.code(201).send(t)
  })

  // Transactions
  server.post('/transactions', { preHandler: (await import('./auth')).requireRole(['cashier','manager','admin']) }, async (request, reply) => {
    // @ts-ignore
    const body = request.body || {}
    const required = ['stationId', 'pumpId', 'nozzleId', 'liters', 'unitPrice', 'paymentMethod']
    for (const r of required) {
      if (body[r] === undefined || body[r] === null) return reply.code(400).send({ error: `${r}_required` })
    }

    // Fetch nozzle to determine fuel type and validate
    const nozzle = await prisma.nozzle.findUnique({ where: { id: body.nozzleId } })
    if (!nozzle) return reply.code(400).send({ error: 'invalid_nozzle' })

    // Find a tank for that station + fuelType
    const tank = await prisma.tank.findFirst({ where: { stationId: body.stationId, fuelType: nozzle.fuelType } })
    if (!tank) return reply.code(400).send({ error: 'no_tank_for_fuel' })

    const liters = Number(body.liters)
    if (tank.currentLiters < liters) return reply.code(400).send({ error: 'insufficient_fuel' })

    const total = liters * Number(body.unitPrice)

    // Use a transaction to create transaction record and update tank atomically
    const result = await prisma.$transaction(async (tx) => {
      const created = await tx.transaction.create({ data: {
        stationId: body.stationId,
        pumpId: body.pumpId,
        nozzleId: body.nozzleId,
        userId: body.userId || null,
        startTime: body.startTime ? new Date(body.startTime) : new Date(),
        endTime: body.endTime ? new Date(body.endTime) : null,
        liters,
        unitPrice: Number(body.unitPrice),
        totalAmount: total,
        paymentMethod: body.paymentMethod,
        paymentToken: body.paymentToken || null,
        receiptId: body.receiptId || null
      } })

      const newLevel = tank.currentLiters - liters
      await tx.tank.update({ where: { id: tank.id }, data: { currentLiters: newLevel } })

      // Low-stock check: configurable threshold (percent) or absolute liters env var
      const pctThreshold = Number(process.env.LOW_STOCK_THRESHOLD || '0.1')
      const absThreshold = process.env.LOW_STOCK_LITERS ? Number(process.env.LOW_STOCK_LITERS) : null
      const isLow = (newLevel / (tank.capacityLiters || 1)) <= pctThreshold || (absThreshold !== null && newLevel <= absThreshold)

        let createdAlert: any = null
      if (isLow) {
        createdAlert = await tx.alert.create({ data: {
          stationId: body.stationId,
          tankId: tank.id,
          type: 'low_stock',
          message: `Low stock: ${newLevel} liters remaining for ${tank.fuelType}`,
          level: newLevel / (tank.capacityLiters || 1) <= 0.05 ? 'critical' : 'warning'
        } })
      }

      return { created, createdAlert }
    })

    // If an alert was created within the transaction, publish it for realtime clients
    if ((result as any).createdAlert) {
      try {
        const { publish } = await import('./events')
        publish({ type: 'alert.created', payload: (result as any).createdAlert })
      } catch (err) {
        server.log.warn('failed to publish alert event', err)
      }
    }

    // Publish updated tank state for realtime UIs
    try {
      const updatedTank = await prisma.tank.findUnique({ where: { id: tank.id } })
      if (updatedTank) {
        const { publish } = await import('./events')
        publish({ type: 'tank.updated', payload: updatedTank })
      }
    } catch (err) {
      server.log.warn('failed to publish tank.updated event', err)
    }

    return reply.code(201).send((result as any).created)
  })

  // Alerts
  server.get('/alerts', async (request, reply) => {
    const list = await prisma.alert.findMany({ orderBy: { createdAt: 'desc' } })
    return list
  })

  // Create alert (admin/internal use)
  server.post('/alerts', { preHandler: (await import('./auth')).requireRole(['admin','manager']) }, async (request, reply) => {
    // @ts-ignore
    const body = request.body || {}
    if (!body.stationId || !body.type || !body.message) return reply.code(400).send({ error: 'stationId_type_message_required' })
    const a = await prisma.alert.create({ data: { stationId: body.stationId, tankId: body.tankId || null, type: body.type, message: body.message, level: body.level || 'warning' } })

    // Emit realtime event
    try {
      const { publish } = await import('./events')
      publish({ type: 'alert.created', payload: a })
    } catch (err) {
      server.log.warn('failed to publish alert event', err)
    }

    return reply.code(201).send(a)
  })

  // Resolve alert
  server.post('/alerts/:id/resolve', { preHandler: (await import('./auth')).requireRole(['admin','manager']) }, async (request, reply) => {
    // @ts-ignore
    const id = request.params.id
    const a = await prisma.alert.update({ where: { id }, data: { resolved: true, resolvedAt: new Date() } })

    // Emit realtime event
    try {
      const { publish } = await import('./events')
      publish({ type: 'alert.resolved', payload: a })
    } catch (err) {
      server.log.warn('failed to publish alert resolved event', err)
    }

    return a
  })

  // Server-Sent Events endpoint for realtime events
  server.get('/events', async (request, reply) => {
    // Use raw response for SSE
    const res = reply.raw
    res.setHeader('Content-Type', 'text/event-stream')
    res.setHeader('Cache-Control', 'no-cache')
    res.setHeader('Connection', 'keep-alive')
    res.write(`: connected\n\n`)

    const { emitter } = await import('./events')

    const onEvent = (ev: any) => {
      try {
        const data = JSON.stringify(ev)
        res.write(`data: ${data}\n\n`)
      } catch (err) {
        // ignore
      }
    }

    emitter.on('app:event', onEvent)

    request.raw.on('close', () => {
      emitter.removeListener('app:event', onEvent)
    })

    return reply.raw
  })

  return server
}

if (require.main === module) {
  const server = buildServer()
  const start = async () => {
    try {
      await server.listen({ port: 4000, host: '0.0.0.0' })
      server.log.info('API server listening on 4000')
    } catch (err) {
      server.log.error(err)
      process.exit(1)
    }
  }
  start()
}
