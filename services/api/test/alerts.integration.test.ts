import { buildServer } from '../src/index'
import { PrismaClient } from '@prisma/client'

if (!process.env.DATABASE_URL) {
  test.skip('Skipping integration tests (no DATABASE_URL)')
}

describe('alerts integration', () => {
  const prisma = new PrismaClient()
  let server: Awaited<ReturnType<typeof buildServer>> | null = null

  beforeAll(async () => {
    await prisma.$connect()
    await prisma.alert.deleteMany()
    await prisma.station.deleteMany()
    await prisma.user.deleteMany()
    server = buildServer()
    await server.listen({ port: 0 })

    const bcrypt = require('bcryptjs')
    const pw = 'adminpw'
    const hashed = await bcrypt.hash(pw, 8)
    await prisma.user.create({ data: { email: 'admin@example.test', name: 'Admin', role: 'admin', passwordHash: hashed } })
    const loginRes = await server.inject({ method: 'POST', url: '/auth/login', payload: { email: 'admin@example.test', password: pw } })
    const body = JSON.parse(loginRes.body)
    auth = `Bearer ${body.token}`
  }, 20000)

  afterAll(async () => {
    if (server) await server.close()
    await prisma.alert.deleteMany()
    await prisma.station.deleteMany()
    await prisma.$disconnect()
  })

  test('create + list + resolve alert', async () => {
    const sRes = await server!.inject({ method: 'POST', url: '/stations', payload: { name: 'Alert Station' } })
    expect(sRes.statusCode).toBe(201)
    const station = JSON.parse(sRes.body)

    const aRes = await server!.inject({ method: 'POST', url: '/alerts', payload: { stationId: station.id, type: 'test_alert', message: 'This is a test' }, headers: { authorization: auth } })
    expect(aRes.statusCode).toBe(201)
    const alert = JSON.parse(aRes.body)

    const listRes = await server!.inject({ method: 'GET', url: '/alerts' })
    expect(listRes.statusCode).toBe(200)
    const list = JSON.parse(listRes.body)
    expect(Array.isArray(list)).toBe(true)
    expect(list.some((a: any) => a.id === alert.id)).toBe(true)

    const resolveRes = await server!.inject({ method: 'POST', url: `/alerts/${alert.id}/resolve` })
    expect(resolveRes.statusCode).toBe(200)
    const resolved = JSON.parse(resolveRes.body)
    expect(resolved.resolved).toBe(true)
    expect(resolved.resolvedAt).toBeTruthy()
  }, 20000)
})
