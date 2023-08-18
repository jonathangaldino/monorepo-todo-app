import { ITodoRepository } from './todo.types'

type PaginationParams = {
  count?: number
  cursor?: string
}

const defaultPaginationParams: PaginationParams = {
  count: 0,
  cursor: undefined,
}

export class TodoService {
  private todoRepository: ITodoRepository

  constructor({ todoRepository }: { todoRepository: ITodoRepository }) {
    this.todoRepository = todoRepository
  }

  async create(params: { name: string; description: string }) {
    const todo = await this.todoRepository.create({
      name: params.name,
      description: params.description,
    })

    return todo
  }

  async fetch(paginationParams: PaginationParams = defaultPaginationParams) {
    // This shit is gold!
    // https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination

    const todos = await this.todoRepository.getAll({
      count: paginationParams.count,
      cursor: paginationParams.cursor,
    })

    return todos
  }

  async findById(id: string) {
    return this.todoRepository.findById({ id })
  }
}
