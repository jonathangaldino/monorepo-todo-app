import type {
  MutationResolvers,
  QueryResolvers,
} from '@core/schemas/__generated__/graphql'
import { Todo } from '@prisma/client'
import { ApolloContext } from 'context'
import { create, fetch, findById } from '../../modules/todo/todo.services'
import { paginate } from '../paginationHelpers'

export const Query: QueryResolvers = {
  todo: async (_parent, args, ctx, _info) => {
    const todo = await findById(ctx, args.id as string)

    if (!todo) return null

    // todo: perhaps a field level resolver would fix this?
    return {
      ...todo,
      updatedAt: todo.updatedAt.toISOString(),
      createdAt: todo.createdAt.toISOString(),
    }
  },
  todos: async (_parent, { first, after }, ctx: ApolloContext, _info) => {
    // Todo: figure out if I need to do this with types
    const todos = await fetch(ctx, {
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
  createTodo: async (_, args, ctx: ApolloContext, _info) => {
    const { description, name } = args.input

    const todo = await create(ctx, { name, description })

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
