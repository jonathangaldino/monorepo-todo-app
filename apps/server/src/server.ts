import 'tsconfig-paths/register'

import { ApolloServer } from '@apollo/server'
import { startStandaloneServer } from '@apollo/server/standalone'
import express from 'express'
import http, { Server as HttpServer } from 'http'
import { ApolloContext, createContext } from './context'
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

  constructor(params: ServerParams) {
    this.port = params.port ?? PORT
  }

  async start() {
    const app = express()
    this.httpServer = http.createServer(app)

    // Apollo
    const server = new ApolloServer<ApolloContext>({
      schema: loadResolvers(),
    })

    const { url } = await startStandaloneServer(server, {
      listen: { port: this.port },
      context: async ({ req, res }) => {
        const context = await createContext()

        return {
          ...context,
        }
      },
    })

    console.log(`🚀 GraphQL API server at port '${this.port}' at ${url}`)
  }

  async stop() {
    this.httpServer.close()
  }
}
