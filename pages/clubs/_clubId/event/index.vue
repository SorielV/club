<template lang="pug">
  section.section
    .container
      div.is-flex
        h1.title Eventos
        button.button.is-danger(
          v-if="$store.state.isAuth && $store.getters.isMemberOfClub(clubId)"
          @click="gotoCreateEvent"
        ) Add
      hr
      EventListView(
        :fetch='true'
        :fetchParams="{ idClub: clubId }"
        @click="gotoBlog(blog)"
      )
</template>

<script>
import { ListView as EventListView } from '@/components/event'

export default {
  layout: 'club',
  components: {
    EventListView
  },
  data() {
    const clubId = this.$route.params.clubId
    return {
      clubId: clubId
    }
  },
  methods: {
    gotoCreateEvent({ id: blogId }) {
        const { clubId } = this
        this.$router.push(
          `/clubs/${clubId}/event/create`
        )
    }
  }
}
</script>
