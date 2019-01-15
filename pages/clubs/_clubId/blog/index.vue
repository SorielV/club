<template lang="pug">
  section
    br
    .container
      pre Club
      pre {{ club }}
    br
    .container
      pre 
        p Blogs
      section
        b-tabs.block(position='is-centered')
          b-tab-item(label='raw')
            section(v-for="blog in blogs")
              pre(@click="gotoBlog(blog)") {{ blog }}
              br
          b-tab-item(label='component')
            section(v-for="blog in blogs")
              Blog(@click="gotoBlog(blog)" :blog="blog")
            pre https://bulma.io/documentation/layout/media-object/
</template>

<script>
import Blog from '@/components/blog/info.vue'

export default {
  components: {
    Blog
  },
  head() {
    return {
      title: 'Club'
    }
  },
  // TODO: Lazy loading [Skeleton ref= http://danilowoz.com/create-content-loader/]
  /*async fetch ({ store, params: { clubId } }) {
    try {
      if (!store.getters.hasClubInformation(clubId)) {
        await store.dispatch('getClub', clubId)
      }
    } catch(err) {
      window.alert(err)
    }
  },*/
  data() {
    const clubId = this.$route.params.clubId
    return {
      clubId: clubId,
      club: this.$store.getters.getClub(clubId),
      blogs: []
    }
  },
  async mounted() {
    const { clubId } = this

    try {
      const {
        data: { data: blogs }
      } = await this.$axios.get(
        '/api/v1/blog',
        {
          params: {
            idClub: clubId,
            format: 'info'
          }
        }
      )

      this.blogs = blogs

      if (!this.$store.getters.hasClubInformation(clubId)) {
        await this.$store.dispatch('getClub', clubId)
        this.club = this.$store.getters.getClub(clubId)
      } else {
        this.club = this.$store.getters.getClub(clubId)
      }
    } catch(err) {
      alert(err.message)
    }
  },
  methods: {
    gotoBlog({ id: blogId }) {
      const { clubId } = this
      this.$router.push(
        `/clubs/${clubId}/blog/${blogId}`
      )
    }
  }
}
</script>

