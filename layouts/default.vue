<template lang="pug">
  div
    Header
    section
      nuxt.main-container
    //Footer
</template>

<script>
import { Header, Footer } from '~/components'
export default {
  components: {
    Header,
    Footer
  },
  data() {
    return {}
  }
}
</script>

<style scoped>
.hero.is-info .navbar-item, .hero.is-info .navbar-link {
  color: rgba(255, 255, 255, 1) !important;
}
.main-container {
  width: 100% !important;
  height: 100% !important;
}
</style>
