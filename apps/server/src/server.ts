import 'tsconfig-paths/register'

import express from 'express'
import { createHandler } from 'graphql-http/lib/use/express'
import expressPlayground from 'graphql-playground-middleware-express'
import { Server as HttpServer } from 'http'
import { loadResolvers } from './loadResolverHelper'

const PORT = 4000
const GRAPH_QL_ENDPOINT = '/graphql'

interface ServerParams {
  port?: number
  graphqlEndpoint?: string
}

export class Server {
  private httpServer!: HttpServer

  private port: number
  private graphqlEndpoint: string

  constructor(params: ServerParams) {
    this.port = params.port ?? PORT
    this.graphqlEndpoint = params.graphqlEndpoint ?? GRAPH_QL_ENDPOINT
  }

  async start() {
    const app = express()

    app.all(this.graphqlEndpoint, this.createGraphQLHandler())

    // In order to avoid exposing our apis, we could check current environment and add or not. e.g.
    // if (NODE_ENV === 'development')
    app.get(
      '/playground',
      expressPlayground({ endpoint: this.graphqlEndpoint })
    )

    this.httpServer = app.listen(this.port, () =>
      console.log(
        `Running a GraphQL API server at port '${this.port}' at ${this.graphqlEndpoint}`
      )
    )
  }

  async stop() {
    this.httpServer.close()
  }

  private createGraphQLHandler() {
    return createHandler({
      schema: loadResolvers(),
      formatError: (error) => {
        console.error(error)
        return error
      },
    })
  }
}
