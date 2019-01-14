<template lang="pug">
  section
    br
    .container
      pre Club
      pre {{ club }}
    br
    .container
      pre 
        p Blog
      section
        b-tabs.block(position='is-centered')
          b-tab-item(label='raw')
            pre {{ blog }}
          b-tab-item(label='component')
            Blog(:blog='blog')
            pre https://github.com/dansup/bulma-templates/blob/master/templates/blog.html
</template>

<script>
import Blog from '@/components/blog'

export default {
  components: {
    Blog
  },
  head() {
    return {
      title: 'Club'
    }
  },
  // Fetch Blog [High Priority]
  async asyncData({ app, params: { clubId, blogId } }) {
    try {
      // TODO: [Important] Rename id(A-Za-Z)+ to (A-Za-Z)+id
      const {
        data: { data: blog }
      } = await app.$axios.get(
        `/api/v1/blog/${blogId}`, {
          params: {
            idClub: clubId,
            format: 'blog'
          }
        }
      )

      return {
        blog
      }
    } catch(err) {
      alert(err.message)
      return {}
    }
  },
  data() {
    const clubId = this.$route.params.clubId
    return {
      clubId: clubId,
      club: this.$store.getters.getClub(clubId),
      blog: {}
    }
  },
  // Fetch Club Info [Low Priority]
  async created() {
    const { clubId } = this
    if (!this.$store.getters.hasClubInformation(clubId)) {
      await this.$store.dispatch('getClub', clubId)
      this.club = this.$store.getters.getClub(clubId)
    }
  }
}
</script>

