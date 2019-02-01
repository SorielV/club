<template lang="pug">
  section.section
    .container
      Club(:club="club")
      br
      .columns.is-multiline
        .column.is-two-thirds(v-observe-visibility="visibleBlog")
          section(
            v-if="isVisibleBlog"
          )
            BlogListView(
              :fetch='true'
              :fetchParams='{ clubId, limit: 5 }'
            )
        .column.is-auto(v-observe-visibility="visibleEvent")
          section(
            v-if="isLoaderEvent"
          )
            EventListView(
              :fetch='true'
              :fetchParams='{ clubId }'
            )
</template>

<script>
// Lazy component render
// URL: https://github.com/Akryum/vue-observe-visibility
import { ObserveVisibility } from 'vue-observe-visibility'
import Club from '@/components/club'
import { ListView as BlogListView } from '@/components/blog'
import { ListView as EventListView } from '@/components/event'

export default {
  layout: 'club',
  transition: 'slide-left',
  directives: {
    ObserveVisibility
  },
  head() {
    return {
      title: this.club.identifer || 'Club'
    }
  },
  components: {
    Club,
    BlogListView,
    EventListView
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
      club: this.$store.getters.getClub(clubId),
      // Lazy load components
      isLoaderBlog: false,
      isLoaderEvent: false
    }
  },
  computed: {
    isVisibleBlog() {
      return this.isLoaderBlog
    },
    isVisibleEvent() {
      return this.isVisibleEvent
    }
  },
  methods: {
    visibleBlog(isVisible) {
      if (!this.isLoaderBlog && isVisible) {
        this.isLoaderBlog = true
        console.warn('[render] lazyBlog')
      }
    },
    visibleEvent(isVisible) {
      if (!this.isLoaderEvent && isVisible) {
        this.isLoaderEvent = true
        console.warn('[render] lazyBlogEvent')
      }
    },
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
