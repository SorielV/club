<template lang="pug">
  section
    section(v-for="event in data" :key="event.id")
      EventInfo.event-info(:event="event")
</template>

<script>
import EventInfo from './info.vue'

export default {
  components: {
    EventInfo
  },
  props: {
    events: {
      type: Array,
      required: false,
      default: () => []
    },
    // Auto Fetch Blogs
    fetch: {
      type: Boolean,
      required: false,
      default: () => false
    },
    // Fetch Params [clubId, sort order, etc]
    fetchParams: {
      type: Object,
      required: false,
      default: () => {}
    },
    // Paginacion dentro de componente
    isPaginated: {
      type: Boolean,
      required: false,
      default: () => false
    }
  },
  data() {
    return {
      data: this.events.slice()
    }
  },
  async created() {
    if (!this.fetch) {
      return
    }

    try {
      const { 
        data: { data: events }
      } = await this.$axios
        .get('/api/v1/event',{
          params: this.fetchParams
        })

      console.log(events)
      this.data = events
    } catch(err) {
      console.error(err)
    }
  },
  methods: {
    // TODO Report Method
    reportBlog () {

    }
  }
}
</script>

<style scoped>
.event-info {
  margin-bottom: 0.75rem !important;
}
</style>
