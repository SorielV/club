<template lang="pug">
  .hero-head
    header.navbar
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
            a.navbar-item.is-active
              | Inicio
            nuxt-link(to='/blog').navbar-item
              | Blog
            a.navbar-item
              | Eventos
            a.navbar-item
              | Calendario
            a.navbar-item
              | Sobre nosotros
            a.navbar-item
              | Clubes
            span.navbar-item
              a.button.is-info.is-outlined
                span.icon
                  i.mdi.mdi-github
                span Registro
            span.navbar-item
              a.button.is-danger.is-outlined
                span.icon
                  i.mdi.mdi-github
                span Login
</template>
