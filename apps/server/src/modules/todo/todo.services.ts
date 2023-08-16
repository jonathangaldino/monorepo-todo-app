import { ITodoRepository } from './todo.types'

export const create = async (
  deps: { todoRepository: ITodoRepository },
  params: { name: string; description: string }
) => {
  const todo = await deps.todoRepository.create({
    name: params.name,
    description: params.description,
  })

  return todo
}

type PaginationParams = {
  count?: number
  cursor?: string
}

const defaultPaginationParams: PaginationParams = {
  count: 0,
  cursor: undefined,
}

export const fetch = async (
  deps: { todoRepository: ITodoRepository },
  paginationParams: PaginationParams = defaultPaginationParams
) => {
  // This shit is gold!
  // https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination

  const todos = await deps.todoRepository.getAll({
    count: paginationParams.count,
    cursor: paginationParams.cursor,
  })

  return todos
}

export const findById = async (
  deps: { todoRepository: ITodoRepository },
  id: string
) => {
  return deps.todoRepository.findById({ id })
}
