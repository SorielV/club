<template lang="pug">
  .hero-head
    header.navbar.is-black.has-shadow
      .container
        .navbar-brand
          a.navbar-item(href="/")
            img(src='https://bulma.io/images/bulma-type-white.png', alt='Logo')
          span.navbar-burger.burger(data-target='navbarMenuHeroC')
            span
            span
            span
        #navbarMenuHeroC.navbar-menu
          .navbar-end
            nuxt-link.navbar-item(
              :to="'/clubs/' + this.$route.params.clubId"
            )
              | Inicio [Club]
            nuxt-link.navbar-item(
              :to="'/clubs/' + this.$route.params.clubId + '/blog'"
            )
              | Blog
            nuxt-link.navbar-item(
              :to="'/clubs/' + this.$route.params.clubId + '/event'"
            )
              | Eventos
            nuxt-link.navbar-item(
              :to="'/clubs/' + this.$route.params.clubId + '/calendar'"
            )
              | Calendario
            nuxt-link.navbar-item(
              :to="'/clubs/' + this.$route.params.clubId + '/resources'"
            )
              | Recursos
            template(v-if="$store.state.isAuth")
              span.navbar-item
                p Logged as {{ $store.state.user.username }}
            template(v-else)
              span.navbar-item
                a.button.is-info
                  span.icon
                    i.mdi.mdi-github
                  span Registro
              span.navbar-item
                nuxt-link.button.is-danger(
                  :to="'/login'"
                )
                  span.icon
                    i.mdi.mdi-github
                  span Login
</template>
