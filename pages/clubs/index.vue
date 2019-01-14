<template lang="pug">
  section.section
    .container
      div.is-flex
        h1.title Clubs
        .buttons(style="margin: auto")
          button.button.is-white Format =>
          button.button.is-info(@click="getClubs('simple')") Simple
          button.button.is-link(@click="getClubs('complete')") Complete
      hr
      div(v-for="club in clubs")
        pre(@click="toClub(club)") {{ club }}
        br
</template>

<script>
export default {
  async asyncData({ app }) {
    try {
      const {
        data: { data: clubs }
      } = await app.$axios.get('/api/v1/club') 
      return { clubs }
    } catch(error) {
      return { clubs: [] }
    }
  },
  data() {
    return {
      clubs: [1]
      
    }
  },
  methods: {
    toClub({ id }) {
      this.$router.push(`/clubs/${id}`)
    },
    getClubs(format) {
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

