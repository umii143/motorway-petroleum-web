import { FastifyRequest, FastifyReply } from 'fastify'
import bcrypt from 'bcryptjs'
import { prisma } from './prisma'

export async function hashPassword(password: string) {
  return bcrypt.hash(password, 8)
}

export async function verifyPassword(password: string, hash: string) {
  return bcrypt.compare(password, hash)
}

export function requireAuth() {
  return async (request: FastifyRequest, reply: FastifyReply) => {
    try {
      // @ts-ignore
      await request.jwtVerify()
    } catch (err) {
      reply.code(401).send({ error: 'unauthenticated' })
    }
  }
}

export function requireRole(roles: string[] | string) {
  const roleList = Array.isArray(roles) ? roles : [roles]
  return async (request: any, reply: FastifyReply) => {
    try {
      await request.jwtVerify()
      const user = request.user as { id: string; email: string; role: string }
      if (!user || !roleList.includes(user.role)) return reply.code(403).send({ error: 'forbidden' })
    } catch (err) {
      reply.code(401).send({ error: 'unauthenticated' })
    }
  }
}

export async function registerUser(payload: { email: string; password: string; name?: string; role?: string }) {
  const existing = await prisma.user.findUnique({ where: { email: payload.email } })
  if (existing) throw new Error('user_exists')
  const passwordHash = await hashPassword(payload.password)
  const user = await prisma.user.create({ data: { email: payload.email, name: payload.name || null, role: payload.role || 'cashier', passwordHash } })
  return user
}

export async function authenticateUser(email: string, password: string) {
  const user = await prisma.user.findUnique({ where: { email } })
  if (!user) throw new Error('invalid_credentials')
  const ok = await verifyPassword(password, user.passwordHash)
  if (!ok) throw new Error('invalid_credentials')
  return user
}
