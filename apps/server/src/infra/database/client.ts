import { PrismaClient } from '.prisma/client'

export type Database = PrismaClient

let db: Database

export function getDatabase(): Database {
  if (db) {
    return db
  }

  db = new PrismaClient({
    // log: process.env.PRISMA_DEBUG ? ['query'] : undefined,
  })

  return db
}

export type { Todo } from '.prisma/client'
