import { PrismaClient } from '@prisma/client'
import { DeepMockProxy, mockDeep } from 'jest-mock-extended'

export type MockContext = {
  db: DeepMockProxy<PrismaClient>
}

export const createMockContext = (): MockContext => {
  return {
    db: mockDeep<PrismaClient>(),
  }
}
