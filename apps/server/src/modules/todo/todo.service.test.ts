import { makeTodoServiceDeps } from '@tests/modules/todo/make-todo-service-deps'
import { create } from './todo.services'
import { ITodoRepository } from './todo.types'

describe('Todo Services', () => {
  let todoRepository: ITodoRepository

  beforeEach(() => {
    const { repository } = makeTodoServiceDeps()
    todoRepository = repository
  })

  it('should create a todo', async () => {
    const todo = await create(
      { todoRepository },
      { name: 'new todo', description: 'new todo' }
    )

    expect(todo).toBeDefined()
  })
})
