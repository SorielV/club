<template lang="pug">
  section.section
    .container
      div.is-flex
        h1.title Topics
      hr
    .container
      pre 
        p Topics
      section
        b-tabs.block(position='is-centered')
          b-tab-item(label='raw')
            section(v-for="club in clubs")
              pre(@click="toClub(club)") {{ club }}
              br
          b-tab-item(label='component')
            //TODO: Topic Component
            pre TODO
</template>

<script>
export default {
  components: {},
  async asyncData({ app }) {
    try {
      const {
        data: { data: clubs }
      } = await app.$axios.get('/api/v1/topic') 
      return { clubs }
    } catch(error) {
      return { clubs: [] }
    }
  },
  data() {
    return {
      format: 'simple',
      clubs: []
    }
  },
  methods: {
    toClub({ id }) {
      this.$router.push(`/clubs/${id}`)
    },
    getClubs(format) {
      this.format = format
      this.$axios
        .get('/api/v1/club', { params: { format } }) 
        .then(({ data: { data: clubs }}) => {
          this.clubs = clubs
        }).catch((err) => {
          alert(err.message)
        })
    }
  }
}
</script>