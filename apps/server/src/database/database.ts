import { PrismaClient } from '.prisma/client'

let prisma: PrismaClient

export function getPrisma(): PrismaClient {
  if (prisma) {
    return prisma
  }

  prisma = new PrismaClient({
    log: process.env.PRISMA_DEBUG ? ['query'] : undefined,
  })

  return prisma
}

export type { Todo } from '.prisma/client'
export { PrismaClient }

