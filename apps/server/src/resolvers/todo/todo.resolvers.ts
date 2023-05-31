import type {
  MutationResolvers,
  QueryResolvers,
  Todo,
} from '@core/schemas/__generated__/graphql'
import TodoService from '../../modules/todo/todo.services'
import { paginate } from '../paginationHelpers'

const todoService = new TodoService()

export const Query: QueryResolvers = {
  todo: async (_, args, _context) => {
    const todo = await todoService.findById(args.id as string)
    return todo
  },
  todos: async (_, _args, _context) => {
    const todos = await todoService.fetch()

    const { edges, pageInfo } = paginate<Todo>(todos)

    return {
      edges,
      pageInfo,
    }
  },
}

export const Mutation: MutationResolvers = {
  createTodo: async (_, args, _context) => {
    const { description, name } = args.input

    const todo = await todoService.create({ name, description })

    return {
      todoEdge: {
        node: todo,
      },
    }
  },
}
