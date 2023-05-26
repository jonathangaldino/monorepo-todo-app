import { loadFilesSync } from '@graphql-tools/load-files';
import { mergeTypeDefs } from '@graphql-tools/merge';
import { makeExecutableSchema } from '@graphql-tools/schema';
import path from 'path';

function getTypeDefs() {
  const typesArray = loadFilesSync(
    path.join(__dirname, 'types', '**', '*.types.graphql'),
    { recursive: true }
  );
  return mergeTypeDefs(typesArray);
}

export function buildGraphQLSchema() {
  const typeDefs = getTypeDefs();
  return makeExecutableSchema({ typeDefs });
}
