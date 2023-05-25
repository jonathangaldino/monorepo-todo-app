import type { QueryResolvers } from '@core/schemas/__generated__/graphql';

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
