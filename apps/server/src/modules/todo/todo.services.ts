import { getPrisma } from '../../database/database'

const prisma = getPrisma()

export const create = async (params: { name: string; description: string }) => {
  const todo = await prisma.todo.create({
    data: {
      name: params.name,
      description: params.description,
      completed: false,
    },
  })

  return todo
}

type PaginationParams = {
  howMany?: number
  afterCursor?: string
}

const defaultPaginationParams: PaginationParams = {
  howMany: 0,
  afterCursor: undefined,
}

export const fetch = async (
  paginationParams: PaginationParams = defaultPaginationParams
) => {
  const todos = await prisma.todo.findMany({
    take: paginationParams.howMany,
    orderBy: {},
  })

  return todos
}

export const findById = async (id: string) => {
  return prisma.todo.findUnique({
    where: {
      id,
    },
  })
}
