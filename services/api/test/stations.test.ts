import { buildServer } from '../src/index'

jest.mock('../src/prisma', () => ({
  prisma: {
    station: {
      findMany: jest.fn().mockResolvedValue([{ id: 'st_1', name: 'Test Station' }]),
      create: jest.fn().mockImplementation(({ data }) => Promise.resolve({ id: 'st_new', ...data })),
      findUnique: jest.fn().mockImplementation(({ where: { id } }) => Promise.resolve(id === 'st_1' ? { id: 'st_1', name: 'Test Station' } : null))
    }
  }
}))

describe('stations routes', () => {
  const server = buildServer()

  afterAll(async () => {
    await server.close()
  })

  test('GET /stations returns list', async () => {
    const res = await server.inject({ method: 'GET', url: '/stations' })
    expect(res.statusCode).toBe(200)
    const body = JSON.parse(res.body)
    expect(Array.isArray(body)).toBe(true)
    expect(body[0].name).toBe('Test Station')
  })

  test('POST /stations creates', async () => {
    const res = await server.inject({ method: 'POST', url: '/stations', payload: { name: 'New' } })
    expect(res.statusCode).toBe(201)
    const body = JSON.parse(res.body)
    expect(body.id).toBe('st_new')
    expect(body.name).toBe('New')
  })

  test('GET /stations/:id returns 404 for unknown', async () => {
    const res = await server.inject({ method: 'GET', url: '/stations/unknown' })
    expect(res.statusCode).toBe(404)
  })
})
