<template lang="pug">
  .hero-head
    header.navbar.is-link
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
            nuxt-link(to='/').navbar-item
              | Inicio
            nuxt-link(to='/blog').navbar-item
              | Blog
            nuxt-link(to='/events').navbar-item
              | Eventos
            nuxt-link(to='/calendar').navbar-item
              | Calendario
            nuxt-link(to='/about').navbar-item
              | Sobre nosotros
            nuxt-link(to='/clubs').navbar-item
              | Clubes
            nuxt-link(to='/topics').navbar-item
              | Temas
            span.navbar-item
              a.button.is-info
                span.icon
                  i.mdi.mdi-github
                span Registro
            span.navbar-item
              nuxt-link(to='/login').button.is-danger
                span.icon
                  i.mdi.mdi-github
                span Login
</template>
