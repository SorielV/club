<template lang="pug">
  section
    br
    .container
      pre Club
      pre {{ club }}
    pre.container
      .buttons.is-flex.is-centered
        button.button.is-info(@click="pushRoute('blog')") Blog
        button.button.is-info(@click="pushRoute('calendar')") Calendar
        button.button.is-info(@click="pushRoute('event')") Events
    br
    .container
      p Secciones
</template>

<script>
export default {
  head() {
    return {
      title: 'Club'
    }
  },
  async fetch ({ store, params: { clubId } }) {
    try {
      if (!store.getters.hasClubInformation(clubId)) {
        await store.dispatch('getClub', clubId)
      }
    } catch(err) {
      window.alert(err)
    }
  },
  data() {
    const clubId = this.$route.params.clubId
    return {
      clubId: clubId,
      club: this.$store.getters.getClub(clubId)
    }
  },
  methods: {
    pushRoute(route) {
      switch(route) {
        case 'blog':
        case 'calendar':
        case 'event':
          this.$router.push(
            `/clubs/${this.clubId}/${route}`
          )
        break
      }
    }
  }
}
</script>

