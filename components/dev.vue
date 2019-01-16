<template lang="pug">
  section
    .container(style="margin-top: 2%; margin-bottom: 2%;")
      pre.has-text-centered Dev
      slot
      div
        pre Store
        pre {{ $store.state }}
      div
        pre Route
        pre {{ routerInfo }}
      div
        pre Nuxt
        pre {{ Object.keys($nuxt) }}
</template>

<script>
export default {
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
