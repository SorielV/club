<template lang="pug">
  div.section
    .container 
      pre {{ events }}
</template>

<script>
export default {
  layout: 'club',
  async asyncData({ app, params: { clubId } }) {
     try {
      // TODO: [Important] Rename id(A-Za-Z)+ to (A-Za-Z)+id
      const {
        data: { data: events }
      } = await app.$axios.get(
        `/api/v1/event`, {
          params: {
            idClub: clubId,
          }
        }
      )

      return {
        events
      }
    } catch(err) {
      alert(err.message)
      return {}
    }
  }
}
</script>
