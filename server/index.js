

import express from 'express'
import consola from 'consola'
import { Nuxt, Builder } from 'nuxt'
import { ClubAPI } from './web/router/api/v1/club'
import { BlogAPI } from './web/router/api/v1/blog'
import { CalendarAPI, EventAPI  } from './web/router/api/v1/calendar'

const app = express()
const host = process.env.HOST || '127.0.0.1'
const port = process.env.PORT || 3000

app.set('port', port)

// Import and Set Nuxt.js options
let config = require('../nuxt.config.js')
config.dev = !(process.env.NODE_ENV === 'production')

async function start() {
  // Init Nuxt.js
  const nuxt = new Nuxt(config)

  // Build only in dev mode
  if (config.dev) {
    const builder = new Builder(nuxt)
    await builder.build()
  }

  // Give nuxt middleware to express
  app.use('/api/v1/club', ClubAPI)
  app.use('/api/v1/blog', BlogAPI)
  app.use('/api/v1/calendar', CalendarAPI)
  app.use('/api/v1/event', EventAPI)
  app.use(nuxt.render)

  // Listen the server
  app.listen(port, host)
  consola.ready({
    message: `Server listening on http://${host}:${port}`,
    badge: true
  })
}
start()
