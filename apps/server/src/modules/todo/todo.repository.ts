import { PrismaClient } from '@prisma/client'
import { randomBytes } from 'crypto'
import { ITodoRepository } from './todo.types'

export class TodoRepository implements ITodoRepository {
  constructor(private readonly db: PrismaClient) {}

  async create(
    input: ITodoRepository.CreateTodoInput
  ): ITodoRepository.CreateTodoOutput {
    const id = randomBytes(9).toString('base64url')

    const todo = await this.db.todo.create({
      data: {
        ...input,
        completed: false,
        id,
      },
    })

    return todo
  }

  async findById(
    input: ITodoRepository.FindByIdInput
  ): ITodoRepository.FindByIdOutput {
    const todo = await this.db.todo.findUnique({
      where: {
        id: input.id,
      },
    })

    return todo
  }

  async getAll(
    input: ITodoRepository.GetAllInput
  ): ITodoRepository.GetAllOutput {
    const todos = await this.db.todo.findMany({
      skip: input.cursor ? 1 : undefined,
      take: input.count,
      cursor: input.cursor ? { id: input.cursor } : undefined,
      orderBy: {
        createdAt: 'asc',
      },
    })

    return todos
  }
}
