<template lang="pug">
  div
    Header
    section
      nuxt.main-container
    //Footer
    section.container(style="margin-top: 10%; margin-bottom: 2%;")
      h1.title Dev
      div
        p Store
        pre {{ $store.state }}
      div
        p Route
        pre {{ routerInfo }}
      div
        p Nuxt
        pre {{ Object.keys($nuxt) }}
</template>

<script>
import { Header, Footer } from '~/components'
export default {
  middleware: 'auth-status',
  components: {
    Header,
    Footer
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
