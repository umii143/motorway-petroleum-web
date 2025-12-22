import { buildServer } from '../src/index'
import { PrismaClient } from '@prisma/client'

// Integration tests require DATABASE_URL to be set (CI provides this via service)
if (!process.env.DATABASE_URL) {
  // eslint-disable-next-line jest/no-focused-tests
  test.skip('Skipping integration tests (no DATABASE_URL)')
}

describe('stations integration (DB-backed)', () => {
  const prisma = new PrismaClient()
  let server: Awaited<ReturnType<typeof buildServer>> | null = null

  beforeAll(async () => {
    await prisma.$connect()
    // ensure clean state
    await prisma.station.deleteMany()
    server = buildServer()
    // server.inject works without listening, but we start listening to be explicit
    await server.listen({ port: 0 })
  }, 20000)

  afterAll(async () => {
    if (server) await server.close()
    await prisma.station.deleteMany()
    await prisma.$disconnect()
  })

  test('POST /stations persists to DB', async () => {
    const res = await server!.inject({ method: 'POST', url: '/stations', payload: { name: 'CI Station' } })
    expect(res.statusCode).toBe(201)
    const body = JSON.parse(res.body)
    expect(body.name).toBe('CI Station')

    const db = await prisma.station.findUnique({ where: { id: body.id } })
    expect(db).not.toBeNull()
    expect(db!.name).toBe('CI Station')
  })

  test('GET /stations returns list with created station', async () => {
    const res = await server!.inject({ method: 'GET', url: '/stations' })
    expect(res.statusCode).toBe(200)
    const list = JSON.parse(res.body)
    expect(Array.isArray(list)).toBe(true)
    expect(list.some((s: any) => s.name === 'CI Station')).toBe(true)
  })
})
