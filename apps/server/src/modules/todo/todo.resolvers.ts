import type {
  MutationResolvers,
  QueryResolvers,
} from '@core/schemas/__generated__/graphql'
import { Todo as TodoModel } from '@prisma/client'
import { ApolloContext } from 'src/context'
import { z } from 'zod'
import { paginate } from '../../graphql-utils'
import { makeTodoService } from './factories/makeTodoService'

export const Query: QueryResolvers = {
  todo: async (_parent, args, ctx, _info) => {
    const schema = z
      .object({
        id: z
          .string()
          .trim()
          .min(5, { message: 'Must be at least 5 characters long' }),
      })
      .required()

    const parseResult = schema.safeParse(args)

    if (!parseResult.success) {
      // todo: improve GraphQL errors
      throw new Error(parseResult.error.issues[0].message)
    }

    const {
      data: { id },
    } = parseResult
    const { service } = makeTodoService(ctx.db)

    const todo = await service.findById(id as string)

    if (!todo) return null

    return todo
  },

  todos: async (_parent, { first, after }, ctx: ApolloContext, _info) => {
    const { service } = makeTodoService(ctx.db)

    const todos = await service.fetch({
      cursor: after!,
      count: first as number | undefined,
    })

    const { edges, pageInfo } = paginate<TodoModel>(todos)

    return {
      edges,
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
        },
        cursor: todo.id,
      },
    }
  },
}
