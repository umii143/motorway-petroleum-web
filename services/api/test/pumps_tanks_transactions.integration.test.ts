import { buildServer } from '../src/index'
import { PrismaClient } from '@prisma/client'

if (!process.env.DATABASE_URL) {
  test.skip('Skipping integration tests (no DATABASE_URL)')
}

describe('pumps/tanks/transactions integration (DB-backed)', () => {
  const prisma = new PrismaClient()
  let server: Awaited<ReturnType<typeof buildServer>> | null = null

  beforeAll(async () => {
    await prisma.$connect()
    // clean state
    await prisma.transaction.deleteMany()
    await prisma.nozzle.deleteMany()
    await prisma.pump.deleteMany()
    await prisma.tank.deleteMany()
    await prisma.station.deleteMany()
    await prisma.user.deleteMany()
    server = buildServer()
    await server.listen({ port: 0 })

    // create a cashier user and obtain token
    const bcrypt = require('bcryptjs')
    const pw = 'secret'
    const hashed = await bcrypt.hash(pw, 8)
    await prisma.user.create({ data: { email: 'cashier@example.test', name: 'Cashier', role: 'cashier', passwordHash: hashed } })
    const loginRes = await server.inject({ method: 'POST', url: '/auth/login', payload: { email: 'cashier@example.test', password: pw } })
    const body = JSON.parse(loginRes.body)
    auth = `Bearer ${body.token}`
  }, 20000)

  afterAll(async () => {
    if (server) await server.close()
    await prisma.transaction.deleteMany()
    await prisma.nozzle.deleteMany()
    await prisma.pump.deleteMany()
    await prisma.tank.deleteMany()
    await prisma.station.deleteMany()
    await prisma.$disconnect()
  })

  test('create station -> pump -> tank -> transaction', async () => {
    const sRes = await server!.inject({ method: 'POST', url: '/stations', payload: { name: 'Int Station' } })
    expect(sRes.statusCode).toBe(201)
    const station = JSON.parse(sRes.body)

    const pRes = await server!.inject({ method: 'POST', url: '/pumps', payload: { stationId: station.id, pumpNumber: 1 }, headers: { authorization: auth } })
    expect(pRes.statusCode).toBe(201)
    const pump = JSON.parse(pRes.body)

    const tRes = await server!.inject({ method: 'POST', url: '/tanks', payload: { stationId: station.id, fuelType: 'ULP95', capacityLiters: 5000 }, headers: { authorization: auth } })
    expect(tRes.statusCode).toBe(201)
    const tank = JSON.parse(tRes.body)

    // Create a nozzle for the pump so transactions can reference it
    const n = await prisma.nozzle.create({ data: { pumpId: pump.id, nozzleNumber: 1, fuelType: 'ULP95', price: 1.5 } })

    const txRes = await server!.inject({ method: 'POST', url: '/transactions', payload: { stationId: station.id, pumpId: pump.id, nozzleId: n.id, liters: 10, unitPrice: 1.5, paymentMethod: 'card' }, headers: { authorization: auth } })
    expect(txRes.statusCode).toBe(201)
    const tx = JSON.parse(txRes.body)
    expect(tx.totalAmount).toBe(15)

    const dbTx = await prisma.transaction.findUnique({ where: { id: tx.id } })
    expect(dbTx).not.toBeNull()
    expect(dbTx!.liters).toBe(10)

    // Check tank was decremented
    const dbTank = await prisma.tank.findUnique({ where: { id: tank.id } })
    expect(dbTank!.currentLiters).toBe(tank.currentLiters - 10)
  }, 20000)

  test('transaction that causes low stock creates an alert', async () => {
    // create a station with tiny tank
    const sRes = await server!.inject({ method: 'POST', url: '/stations', payload: { name: 'LowStock Station' } })
    expect(sRes.statusCode).toBe(201)
    const station = JSON.parse(sRes.body)

    const pRes = await server!.inject({ method: 'POST', url: '/pumps', payload: { stationId: station.id, pumpNumber: 2 } })
    expect(pRes.statusCode).toBe(201)
    const pump = JSON.parse(pRes.body)

    const tRes2 = await server!.inject({ method: 'POST', url: '/tanks', payload: { stationId: station.id, fuelType: 'ULP95', capacityLiters: 20, currentLiters: 15 } })
    expect(tRes2.statusCode).toBe(201)
    const tinyTank = JSON.parse(tRes2.body)

    const n2 = await prisma.nozzle.create({ data: { pumpId: pump.id, nozzleNumber: 1, fuelType: 'ULP95', price: 1.5 } })

    // Set env threshold high so the resulting 5 liters triggers low stock
    process.env.LOW_STOCK_THRESHOLD = '0.5'

    const txRes2 = await server!.inject({ method: 'POST', url: '/transactions', payload: { stationId: station.id, pumpId: pump.id, nozzleId: n2.id, liters: 10, unitPrice: 1.5, paymentMethod: 'card' } })
    expect(txRes2.statusCode).toBe(201)
    const tx2 = JSON.parse(txRes2.body)

    const dbTank2 = await prisma.tank.findUnique({ where: { id: tinyTank.id } })
    expect(dbTank2!.currentLiters).toBe(5)

    const alerts = await prisma.alert.findMany({ where: { stationId: station.id } })
    expect(alerts.length).toBeGreaterThan(0)
    expect(alerts[0].type).toBe('low_stock')
  }, 20000)
})