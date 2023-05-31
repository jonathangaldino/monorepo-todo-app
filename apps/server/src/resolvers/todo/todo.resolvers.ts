import type {
  MutationResolvers,
  QueryResolvers,
} from '@core/schemas/__generated__/graphql'
import { Todo } from '@prisma/client'
import { create, fetch, findById } from '../../modules/todo/todo.services'
import { paginate } from '../paginationHelpers'

export const Query: QueryResolvers = {
  todo: async (_, args, _context) => {
    const todo = await findById(args.id as string)

    if (!todo) return null

    // todo: perhaps a field level resolver would fix this?
    return {
      ...todo,
      updatedAt: todo.updatedAt.toISOString(),
      createdAt: todo.createdAt.toISOString(),
    }
  },
  todos: async (_, { first, after }, _context) => {
    // Todo: figure out if I need to do this with types
    const todos = await fetch({
      count: first as number | undefined,
      cursor: after as string | undefined,
    })

    const { edges, pageInfo } = paginate<Todo>(todos)

    return {
      edges: edges.map((edge) => ({
        ...edge,
        node: {
          ...edge.node,
          // todo: perhaps a field level resolver would fix this?
          createdAt: edge.node.createdAt.toISOString(),
          updatedAt: edge.node.createdAt.toISOString(),
        },
      })),
      pageInfo,
    }
  },
}

export const Mutation: MutationResolvers = {
  createTodo: async (_, args, _context) => {
    const { description, name } = args.input

    const todo = await create({ name, description })

    return {
      todoEdge: {
        node: {
          ...todo,
          // todo: perhaps a field level resolver would fix this?
          updatedAt: todo.updatedAt.toISOString(),
          createdAt: todo.createdAt.toISOString(),
        },
        curso: todo.id,
      },
    }
  },
}
