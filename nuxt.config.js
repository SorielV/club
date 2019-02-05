// TODO: Update headers [information]
const pkg = require('./package')

module.exports = {
  mode: 'spa',
  head: {
    title: pkg.name,
    htmlAttrs: {
      lang: 'es'
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: pkg.description }
    ],
    link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }]
  },
  loading: { color: '#fff' },
  css: [],
  plugins: [],
  modules: ['@nuxtjs/axios', 'nuxt-buefy'],
  axios: {
    baseURL: process.env.API_URL || '//'
  },
  /*
    // Auth Module
    auth: {
      strategies: {
        local: {
          endpoints: {
            login: { url: '/api/auth/login', method: 'post', propertyName: 'token' },
            logout: { url: '/api/auth/logout', method: 'post' },
            user: { url: '/api/v1/auth/user', method: 'get', propertyName: 'user' }
          },
          // tokenRequired: true,
          // tokenType: 'bearer',
        }
      }
    },
  */
  router: {
    middleware: ['auth-status', 'club-member']
  },
  build: {
    extend(config, ctx) {
      if (ctx.isDev && ctx.isClient) {
        config.module.rules.push({
          enforce: 'pre',
          test: /\.(js|vue)$/,
          loader: 'eslint-loader',
          exclude: /(node_modules)/
        })
      }
    }
  }
}
