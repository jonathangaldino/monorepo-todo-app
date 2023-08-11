import { Context } from '../../context'
import { getPrisma } from '../../database/database'

const prisma = getPrisma()

export const create = async (
  ctx: Context,
  params: { name: string; description: string }
) => {
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
  count?: number
  cursor?: string
}

const defaultPaginationParams: PaginationParams = {
  count: 0,
  cursor: undefined,
}

export const fetch = async (
  ctx: Context,
  paginationParams: PaginationParams = defaultPaginationParams
) => {
  // This shit is gold!
  // https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination
  const todos = await ctx.db.todo.findMany({
    skip: paginationParams.cursor ? 1 : undefined,
    take: paginationParams.count,
    cursor: paginationParams.cursor
      ? { id: paginationParams.cursor }
      : undefined,
    orderBy: {
      createdAt: 'asc',
    },
  })

  return todos
}

export const findById = async (ctx: Context, id: string) => {
  return prisma.todo.findUnique({
    where: {
      id,
    },
  })
}
