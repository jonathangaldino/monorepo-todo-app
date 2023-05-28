import { printSchemaWithDirectives } from '@graphql-tools/utils'
import fs from 'fs'
import path from 'path'
import { buildGraphQLSchema } from './'

const folder = path.resolve(path.join('__generated__'))
if (!fs.existsSync(folder)) {
  fs.mkdirSync(folder)
}

fs.writeFileSync(
  path.join(folder, 'schema.graphql'),
  printSchemaWithDirectives(buildGraphQLSchema())
)
