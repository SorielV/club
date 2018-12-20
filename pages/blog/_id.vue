<template lang="pug">
  
</template>

<script>
export default {
  async asyncData({ app, params: { id } }) {
    try {
      // await app.$axios.get(`/api/repo/${id}?format=full`)
      return {
        h2: 1
      }
    } catch (error) {
      return {}
    }
  },
  data: () => ({
    hi: ':v'
  }),
  created() {
    window.alert(this.hi)
  }
}
</script>

