<template lang="pug">
  section.section
    .container.is-fluid
      section
        b-tabs.block(position='is-centered' v-model="selectedTab")
          b-tab-item(label='raw')
            pre {{ blog }}
          b-tab-item(label='component')
            Blog(:blog='blog')
              template(slot="rating")
                nav.level.is-mobile
                  .level-item.has-text-centered
                    div
                      p.heading Tweets
                      p.title 3,456
                  .level-item.has-text-centered
                    div
                      p.heading Following
                      p.title 123
                  .level-item.has-text-centered
                    div
                      p.heading Followers
                      p.title 456K
                  .level-item.has-text-centered
                    div
                      p.heading Likes
                      p.title 789
              template(slot="commnets")
                Comment
                Comment
                Comment
                Comment

      pre https://github.com/dansup/bulma-templates/blob/master/templates/blog.html
</template>

<script>
import { Blog, Comment } from '@/components/blog'

export default {
  components: {
    Blog,
    Comment
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
    return {
      blog: {},
      selectedTab: 1
    }
  }
}
</script>
