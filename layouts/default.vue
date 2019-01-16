<template lang="pug">
  div
    Header
    section
      nuxt.main-container
    //Footer
    Dev
</template>

<script>
import { Header, Footer, Dev } from '~/components'
export default {
  middleware: ['auth-status'],
  components: {
    Header,
    Footer,
    Dev
  },
  data() {
    return {}
  },
  computed: {
    routerInfo () {
      const { name, path, query, params } = this.$route
      return {
        name,
        path,
        query,
        params 
      }
    }
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
