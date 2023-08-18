import type {
  MutationResolvers,
  QueryResolvers,
} from '@core/schemas/__generated__/graphql'
import { Todo } from '@prisma/client'
import { ApolloContext } from 'src/context'
import { paginate } from '../../graphql-utils'
import { makeTodoService } from './factories/makeTodoService'

export const Query: QueryResolvers = {
  todo: async (_parent, args, ctx, _info) => {
    const { id } = args
    const { service } = makeTodoService(ctx.db)

    // todo: validate arguments

    const todo = await service.findById(id as string)

    if (!todo) return null

    // todo: perhaps a field level resolver would fix this?
    return {
      ...todo,
      updatedAt: todo.updatedAt.toISOString(),
      createdAt: todo.createdAt.toISOString(),
    }
  },

  todos: async (_parent, { first, after }, ctx: ApolloContext, _info) => {
    const { service } = makeTodoService(ctx.db)

    const todos = await service.fetch({
      cursor: after!,
      count: first as number | undefined,
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

    const { service } = makeTodoService(ctx.db)

    const todo = await service.create({ name, description })

    return {
      todoEdge: {
        node: {
          ...todo,
          // todo: perhaps a field level resolver would fix this?
          updatedAt: todo.updatedAt.toISOString(),
          createdAt: todo.createdAt.toISOString(),
        },
        cursor: todo.id,
      },
    }
  },
}
