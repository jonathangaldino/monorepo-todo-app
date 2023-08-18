import type { Config } from '@jest/types'
import { randomUUID } from 'crypto'
import NodeEnvironment from 'jest-environment-node'
import { exec } from 'node:child_process'
import { Client } from 'pg'
import { promisify } from 'util'

const execSync = promisify(exec)

const prismaBinary = '../../node_modules/.bin/prisma'

export default class PrismaTestEnvironment extends NodeEnvironment {
  private schema: string
  private connectionString: string

  constructor(config: Config.ProjectConfig) {
    // @ts-ignore
    super(config)

    const dbUser = 'postgres'
    const dbPass = 'postgres'
    const dbHost = 'localhost'
    const dbPort = '5432'
    const dbName = 'todo-app_test'

    this.schema = `test_${randomUUID()}`
    this.connectionString = `postgresql://${dbUser}:${dbPass}@${dbHost}:${dbPort}/${dbName}?schema=${this.schema}`
  }

  async setup() {
    // eslint-disable-next-line turbo/no-undeclared-env-vars
    process.env.DATABASE_URL = this.connectionString
    this.global.process.env.DATABASE_URL = this.connectionString

    await execSync(`${prismaBinary} migrate deploy`)

    return super.setup()
  }

  async teardown() {
    const client = new Client({
      connectionString: this.connectionString,
    })

    await client.connect()
    await client.query(`DROP SCHEMA IF EXISTS "${this.schema}" CASCADE`)
    await client.end()
  }
}
