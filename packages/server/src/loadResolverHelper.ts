import { loadFilesSync } from '@graphql-tools/load-files';
import { mergeResolvers, mergeTypeDefs } from '@graphql-tools/merge';
import { makeExecutableSchema } from '@graphql-tools/schema';
import path from 'path';

function getTypeDefs() {
  const typesArray = loadFilesSync(
    path.join(__dirname, '..', '..', '..', 'shared', 'schemas', 'src', 'types', '**', '*.types.graphql'),
    { recursive: true }
  );
  return mergeTypeDefs(typesArray);
}

function getServerResolvers() {
  const resolversPath = path.join(__dirname, 'resolvers', '**', '*.resolvers.*');
  const resolversArray = loadFilesSync(resolversPath);
  return mergeResolvers(resolversArray);
}

export function loadResolvers() {
  const typeDefs = getTypeDefs();
  const resolvers = getServerResolvers();

  return makeExecutableSchema({ typeDefs, resolvers });
}
