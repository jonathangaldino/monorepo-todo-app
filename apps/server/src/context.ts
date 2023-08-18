import { BaseContext } from '@apollo/server'
import { Database, getPrisma } from './infra/database/client'

export type Context = {
  db: Database
}

export type ApolloContext = Context & BaseContext

export const createContext = async (): Promise<Context> => {
  const prisma = getPrisma()

  return {
    db: prisma,
  }
}
