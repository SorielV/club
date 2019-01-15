<template lang="pug">
  section
    section.login
      #flow
        span.flow-1
        span.flow-2
        span.flow-3
      section.hero.is-white.is-fullheight
        .hero-body
          .container.has-text-centered
            .column.is-4.is-offset-4
              h3.title.has-text-black Iniciar Sesión
              p.subtitle.has-text-black Logeate en 
                nuxt-link(to="/").has-text-warning Repo-io 
                | para Acceder
              .box
                figure.avatar
                  img(src='https://placehold.it/128x128')
                form(v-on:submit.prevent="handleSubmit")
                  .field
                    .control
                      input.input(placeholder='Correo', autofocus='' v-model="user.username")
                  .field
                    .control
                      input.input(type='password', placeholder='Contraseña' v-model="user.password")
                  .field
                    b-checkbox(type='is-info')
                    | Recuerdame
                  button.button.is-block.is-info.is-large.is-fullwidth Iniciar
              p.has-text-grey
                nuxt-link(to='/singup') Registrate
                |   · 
                a(href='../') Olvidaste tu contraseña
                |   · 
                a(href='../') Ayuda?
</template>

<script>
export default {
  layout: 'clean',
  head() {
    return {
      title: 'Login'
    }
  },
  data() {
    return {
      user: {
        username: '',
        password: ''
      }
    }
  },
  methods: {
    async handleSubmit() {
      try {
        await this.$store.dispatch('login', this.user)
        this.$router.push('/')
      } catch (error) {
        console.error(error)
      }
    }
  }
}
</script>

<style>
#flow span {
  display: block;
  width: 800vw;
  height: 800vw;
  position: absolute;
  top: -180vw;
  left: -50vw;
  border-radius: 90vw;
  opacity: 0.6;
}
.flow-1 {
  background: #191717;
  -webkit-animation: rotating 20s linear infinite;
  -moz-animation: rotating 20s linear infinite;
  -ms-animation: rotating 20s linear infinite;
  -o-animation: rotating 20s linear infinite;
  animation: rotating 20s linear infinite;
}
.flow-2 {
  background: #0f91e2;
  position: absolute;
  -webkit-animation: rotating 15s linear infinite;
  -moz-animation: rotating 15s linear infinite;
  -ms-animation: rotating 15s linear infinite;
  -o-animation: rotating 15s linear infinite;
  animation: rotating 15s linear infinite;
}
.flow-3 {
  background: #a721dc;
  position: absolute;
  -webkit-animation: rotating 7s linear infinite;
  -moz-animation: rotating 7s linear infinite;
  -ms-animation: rotating 7s linear infinite;
  -o-animation: rotating 7s linear infinite;
  animation: rotating 7s linear infinite;
}
@-webkit-keyframes rotating {
  from {
    -ms-transform: rotate(0deg);
    -moz-transform: rotate(0deg);
    -webkit-transform: rotate(0deg);
    -o-transform: rotate(0deg);
    transform: rotate(0deg);
  }
  to {
    -ms-transform: rotate(360deg);
    -moz-transform: rotate(360deg);
    -webkit-transform: rotate(360deg);
    -o-transform: rotate(360deg);
    transform: rotate(360deg);
  }
}
@keyframes rotating {
  from {
    -ms-transform: rotate(0deg);
    -moz-transform: rotate(0deg);
    -webkit-transform: rotate(0deg);
    -o-transform: rotate(0deg);
    transform: rotate(0deg);
  }
  to {
    -ms-transform: rotate(360deg);
    -moz-transform: rotate(360deg);
    -webkit-transform: rotate(360deg);
    -o-transform: rotate(360deg);
    transform: rotate(360deg);
  }
}
.rotating {
  -webkit-animation: rotating 2s linear infinite;
  -moz-animation: rotating 2s linear infinite;
  -ms-animation: rotating 2s linear infinite;
  -o-animation: rotating 2s linear infinite;
  animation: rotating 2s linear infinite;
}
html,
body,
#__layout,
#__nuxt {
  height: 100%;
}
.login {
  background-color: white;
  background-image: -webkit-linear-gradient(top, #4a4090, #372e6c);
  background-image: linear-gradient(to bottom, #4a4090, #372e6c);
  width: 100%;
  height: 100%;
}
.login-from {
  border-radius: 0.25rem;
  padding: 1%;
  background-color: white;
  margin: auto;
  width: 450px;
}
.login-from-content {
  padding: 5%;
}
.something-semantic {
  height: 100%;
  display: table;
  width: 100%;
}
.something-else-semantic {
  display: table-cell;
  text-align: center;
  vertical-align: middle;
}
</style>
