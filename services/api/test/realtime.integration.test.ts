import { buildServer } from '../src/index'
import { PrismaClient } from '@prisma/client'
import { emitter } from '../src/events'

if (!process.env.DATABASE_URL) {
  test.skip('Skipping realtime integration tests (no DATABASE_URL)')
}

describe('realtime events', () => {
  const prisma = new PrismaClient()
  let server: Awaited<ReturnType<typeof buildServer>> | null = null

  beforeAll(async () => {
    await prisma.$connect()
    await prisma.alert.deleteMany()
    await prisma.station.deleteMany()
    server = buildServer()
    await server.listen({ port: 0 })
  }, 20000)

  afterAll(async () => {
    if (server) await server.close()
    await prisma.alert.deleteMany()
    await prisma.station.deleteMany()
    await prisma.$disconnect()
  })

  test('emits pump.created and tank.updated events', async () => {
    const stationRes = await server!.inject({ method: 'POST', url: '/stations', payload: { name: 'RT Station' } })
    expect(stationRes.statusCode).toBe(201)
    const station = JSON.parse(stationRes.body)

    const events: any[] = []
    const listener = (e: any) => events.push(e)
    emitter.on('app:event', listener)

    const pumpRes = await server!.inject({ method: 'POST', url: '/pumps', payload: { stationId: station.id, pumpNumber: 33 }, headers: { authorization: auth } })
    expect(pumpRes.statusCode).toBe(201)

    const tankRes = await server!.inject({ method: 'POST', url: '/tanks', payload: { stationId: station.id, fuelType: 'ULP95', capacityLiters: 1000, currentLiters: 200 }, headers: { authorization: auth } })
    expect(tankRes.statusCode).toBe(201)
    const tank = JSON.parse(tankRes.body)

    // create nozzle then transaction to trigger tank.updated
    const nozzle = await prisma.nozzle.create({ data: { pumpId: JSON.parse(pumpRes.body).id, nozzleNumber: 1, fuelType: 'ULP95', price: 1.5 } })
    const txRes = await server!.inject({ method: 'POST', url: '/transactions', payload: { stationId: station.id, pumpId: JSON.parse(pumpRes.body).id, nozzleId: nozzle.id, liters: 10, unitPrice: 1.5, paymentMethod: 'card' } })
    expect(txRes.statusCode).toBe(201)

    // Give async emitter a small pause
    await new Promise((res) => setTimeout(res, 200))

    emitter.removeListener('app:event', listener)

    // Expect at least pump.created and tank.updated appeared
    const types = events.map((e) => e.type)
    expect(types).toContain('pump.created')
    expect(types).toContain('tank.updated')
  }, 30000)
})
