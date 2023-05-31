import type {
  MutationResolvers,
  QueryResolvers,
} from '@core/schemas/__generated__/graphql'
import TodoService from '../../modules/todo/todo.services'

const todoService = new TodoService()

export const Query: QueryResolvers = {
  todo: (_, args, _context) => ({
    id: args.id.toString(),
    name: 'Random XD',
    description: 'random todo',
    completed: false,
  }),
  todos: async (_, _args, _context) => {
    const todos = await todoService.fetch()

    return {
      edges: todos.map((todo) => ({ node: todo })),
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
