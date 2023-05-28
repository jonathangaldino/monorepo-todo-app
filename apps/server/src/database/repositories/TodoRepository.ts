import { TodoRepositoryI } from '../../modules/todo/todo.types'
import { PrismaClient } from '../database'

export default class TodoRepository implements TodoRepositoryI {
  prisma: PrismaClient

  /**
   * @param _prisma - Prisma client connection
   */
  constructor(_prisma: PrismaClient) {
    this.prisma = _prisma
  }

  async createTodo({
    name,
    description,
  }: TodoRepositoryI.CreateTodoRequest): Promise<TodoRepositoryI.CreateTodoResponse> {
    const todo = await this.prisma.todo.create({
      data: {
        name: name,
        description: description,
        completed: false,
      },
    })

    return todo
  }
}
