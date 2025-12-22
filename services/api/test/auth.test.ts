import { buildServer } from '../src/index'

jest.mock('../src/prisma', () => ({
  prisma: {
    user: {
      findUnique: jest.fn().mockImplementation(({ where: { email } }) => {
        if (email === 'exists@example') return { id: 'u1', email: 'exists@example', passwordHash: '$2a$08$invalidhash' }
        return null
      }),
      create: jest.fn().mockImplementation(({ data }) => Promise.resolve({ id: 'u_new', email: data.email, role: data.role }))
    }
  }
}))

describe('auth register/login routes', () => {
  const server = buildServer()

  afterAll(async () => {
    await server.close()
  })

  test('register returns 201', async () => {
    const res = await server.inject({ method: 'POST', url: '/auth/register', payload: { email: 'new@example', password: 'pw' } })
    expect(res.statusCode).toBe(201)
    const body = JSON.parse(res.body)
    expect(body.email).toBe('new@example')
  })

  test('register duplicate returns 409', async () => {
    const res = await server.inject({ method: 'POST', url: '/auth/register', payload: { email: 'exists@example', password: 'pw' } })
    expect(res.statusCode).toBe(409)
  })
})
