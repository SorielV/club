<template lang="pug">
  section.section
    .container.is-fluid
      Club(:club="club")
</template>

<script>
import Club from '@/components/club'

export default {
  layout: 'club',
  transition: 'slide-left',
  head() {
    return {
      title: this.club.identifer || 'Club'
    }
  },
  components: {
    Club
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
    const { clubId } = this.$route.params
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

