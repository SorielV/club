import path from 'path'
import express from 'express'
import morgan from 'morgan'
import bodyParser from 'body-parser'
import cookieParser from 'cookie-parser'
import helmet from 'helmet'
import consola from 'consola'
import { Nuxt, Builder } from 'nuxt'

// TODO: Update Global API Endpoints
import { ClubAPI } from './web/router/api/v1/club'
import { BlogAPI } from './web/router/api/v1/blog'
import { BlogTagAPI, BlogTopicAPI } from './web/router/api/v1/blog'
import { CalendarAPI, EventAPI } from './web/router/api/v1/calendar'
import { LoginAPI } from './web/router/api/v1/login'
import { TagAPI, TopicAPI } from './web/router/api/v1/catalog'

const app = express()
const host = process.env.HOST || '0.0.0.0'
const port = process.env.PORT || 3000

app.set('port', port)
app.use(
  morgan(function(tokens, req, res) {
    return [
      tokens.method(req, res),
      tokens.url(req, res),
      '\n',
      tokens.status(req, res),
      tokens.res(req, res, 'content-length'),
      '-',
      tokens['response-time'](req, res),
      'ms',
      '\n'
    ].join(' ')
  })
)
app.use(cookieParser())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

// Import and Set Nuxt.js options
const config = {
  ...require('../nuxt.config.js'),
  dev: !(process.env.NODE_ENV === 'production')
}

async function start() {
  let nuxt

  if (process.env['client_env']) {
    nuxt = new Nuxt(config)
    if (config.dev) {
      const builder = new Builder(nuxt)
      await builder.build()
    }
  } else {
    // Static files
    app.use(express.static(path.join(__dirname + './../dist')))
  }

  // TODO: Update Global API Endpoints
  app
    .use('/api/v1/auth', LoginAPI)
    .use('/api/v1/club', ClubAPI)
    .use('/api/v1/blog', BlogAPI)
    .use('/api/v1/calendar', CalendarAPI)
    .use('/api/v1/event', EventAPI)
    .use('/api/v1/blogtag', BlogTagAPI)
    .use('/api/v1/tag', TagAPI)
    .use('/api/v1/topic', TopicAPI)

  if (process.env['client_env']) {
    app.use(nuxt.render)
  }

  app.listen(port, host)
  consola.ready({
    message: `Server listening on http://${host}:${port}`,
    badge: true
  })
}

start()
