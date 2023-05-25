import type { QueryResolvers } from '@core/schemas/__generated__/graphql';

export const Query: QueryResolvers = {
  todo: async (_, args, _context) => ({
      id: args.id.toString(),
      name: 'Random XD',
      description: 'random todo',
      completed: false,
    })
};
