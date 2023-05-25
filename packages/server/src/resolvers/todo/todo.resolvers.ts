import type { MutationResolvers, QueryResolvers } from '@core/schemas/__generated__/graphql';
import TodoService from '../../modules/todo/todo.services';

export const Query: QueryResolvers = {
  todo: (_, args, _context) => ({
    id: args.id.toString(),
    name: 'Random XD',
    description: 'random todo',
    completed: false,
  }),
  todos: (_, _args, _context) => ({
    edges: [
      {
        node: {
          id: '1',
          name: 'Random XD',
          description: 'random todo',
          completed: false,
        }
      },
      {
        node: {
          id: '2',
          name: 'Random XD',
          description: 'random todo',
          completed: false,
        }
      }
    ]
  })
};

export const Mutation: MutationResolvers = {
  createTodo: async (_, args, _context) => {
    const { description, name } = args.input;

    const todoService = new TodoService();
    const todo = await todoService.create({ name, description });

    return {
      todoEdge: {
        node: todo,
      }
    }
  }
}
