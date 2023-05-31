import { getPrisma } from '../../database/database'
import TodoRepository from '../../database/repositories/TodoRepository'
import { TodoRepositoryI } from './todo.types'

export default class TodoService {
  private repository: TodoRepositoryI

  constructor() {
    const prisma = getPrisma()
    this.repository = new TodoRepository(prisma)
  }

  async create(params: { name: string; description: string }) {
    return this.repository.createTodo({
      name: params.name,
      description: params.description,
    })
  }

  async fetch() {
    return this.repository.getAll()
  }
}
