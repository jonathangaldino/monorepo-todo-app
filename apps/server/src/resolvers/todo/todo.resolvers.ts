import type {
  MutationResolvers,
  QueryResolvers,
} from '@core/schemas/__generated__/graphql'
import TodoService from '../../modules/todo/todo.services'

const todoService = new TodoService()

export const Query: QueryResolvers = {
  todo: async (_, args, _context) => {
    const todo = await todoService.findById(args.id as string)
    return todo
  },
  todos: async (_, _args, _context) => {
    const todos = await todoService.fetch()

    return {
      edges: todos.map((todo, index) => ({
        node: todo,
        cursor: todos[index + 1] === undefined ? todo.id : null,
      })),
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
