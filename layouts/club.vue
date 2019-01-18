<template lang="pug">
  div
    Header
    //-.notification.is-link.has-m-1.has-text-centered
      button.delete
      span(v-if="$store.getters.isMemberOfClub(clubId)")
        | Bienvenido Miembro 
      span(v-else)
        | Unete a la aventura :V 
    section
      nuxt.main-container
    Footer
    Dev
      section
        pre Club
        pre {{ $store.getters.getClub(clubId) }}
    
</template>

<script>
import { Dev } from '~/components'
import { Header, Footer } from '~/components/club'

export default {
  // middleware: 'auth-member',
  components: {
    Header,
    Footer,
    Dev
  },
  data() {
    const { clubId } = this.$route.params
    return {
      clubId
    }
  }
}
</script>

<style scoped>
.has-m-1 {
  margin: 1rem;
}
</style>
