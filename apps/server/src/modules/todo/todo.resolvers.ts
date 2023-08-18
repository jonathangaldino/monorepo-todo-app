import type {
  MutationResolvers,
  QueryResolvers,
  TodoResolvers,
} from '@core/schemas/__generated__/graphql'
import { Todo as TodoModel } from '@prisma/client'
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

export const Todo: TodoResolvers = {
  updatedAt: (todo, args, ctx, _info) => {
    console.log({ todo })
    return new Date().toISOString()
  },
}
