import { Database } from '../../src/infra/database/client'

import { DeepMockProxy, mockDeep } from 'jest-mock-extended'

export type MockContext = {
  db: DeepMockProxy<Database>
}

export const createMockContext = (): MockContext => {
  return {
    db: mockDeep<Database>(),
  }
}
