import { BaseContext } from '@apollo/server'
import { PrismaClient } from '@prisma/client'
import { getPrisma } from './database/database'

export type Context = {
  db: PrismaClient
}

export type ApolloContext = Context & BaseContext

export const createContext = async (): Promise<Context> => {
  const prisma = getPrisma()

  return {
    db: prisma,
  }
}
