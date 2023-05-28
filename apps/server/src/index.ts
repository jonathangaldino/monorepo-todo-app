import dotenv from 'dotenv'
dotenv.config()

import { Server } from './server'
;(async function () {
  const server = new Server({})

  await server.start()
})()
