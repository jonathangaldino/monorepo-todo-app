import { generateId } from '@core/essentials'
import { Todo } from '@prisma/client'
import { ITodoRepository } from '../../../../src/modules/todo/todo.types'

const todosDb = new Map<string, Todo>()

export class TodoInMemRepository implements ITodoRepository {
  async create(
    input: ITodoRepository.CreateTodoInput
  ): ITodoRepository.CreateTodoOutput {
    const todo = {
      id: generateId(),
      ...input,
      completed: false,
      createdAt: new Date(),
      updatedAt: new Date(),
    }

    todosDb.set(todo.id, todo)

    return Promise.resolve(todo)
  }

  async findById(
    input: ITodoRepository.FindByIdInput
  ): ITodoRepository.FindByIdOutput {
    let maybeTodo: {} | null = null

    todosDb.forEach((todo) => {
      if (todo.id === input.id) {
        maybeTodo = todo
      }
    })

    return Promise.resolve(maybeTodo)
  }

  getAll(input: ITodoRepository.GetAllInput): ITodoRepository.GetAllOutput {
    let todos: Todo[] = []

    todosDb.forEach((todo) => todos.push(todo))

    return Promise.resolve(todos)
  }
}
