import { Context } from 'context'
import {
  createMockContext,
  MockContext,
} from '../../../tests/db/prisma-context'
import { create } from './todo.services'

let mockCtx: MockContext
let ctx: Context

beforeEach(() => {
  mockCtx = createMockContext()
  ctx = mockCtx as unknown as Context
})

describe('TodoService', () => {
  describe('create', () => {
    it('should ', async () => {
      const todoParams = { name: 'new todo', description: 'old todo?' }

      const todo = await create(ctx, todoParams)

      console.log(todo)
    })
  })
})
