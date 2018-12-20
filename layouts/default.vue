<template lang="pug">
  section.hero.is-black.is-fullheight
    Header
    .hero-body.is-block(style="background: white; color: black;")
      .container-is-fluid
        nuxt
    Footer
</template>

<script>
import Header from '~/components/Header.vue'
import Footer from '~/components/Footer.vue'

export default {
  components: {
    Header,
    Footer
  },
  data() {
    return {
      items: [
        { title: 'Home', icon: 'home', to: { name: 'index' } },
        { title: 'Inspire', icon: 'lightbulb', to: { name: 'inspire' } }
      ]
    }
  }
}
</script>
