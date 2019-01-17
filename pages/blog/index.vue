<template lang="pug">
  section.section
    .container
      div.is-flex
        h1.title Blogs
        //-.buttons(style="margin: auto")
          button.button.is-white Format =>
          button.button.is-info(@click="getBlogs('simple')") Simple
          button.button.is-link(@click="getBlogs('info')") Info
          button.button.is-danger(@click="getBlogs('blog')") Blog

      hr
      b-tabs.block(
          v-model="selectedTab"
          position='is-centered'
        )
          b-tab-item(label='raw')
            div(v-for="blog in blogs")
              pre {{ blog }}
              br
          b-tab-item(label='component')
            div(v-for="blog in blogs")
              BlogInfo(:blog="blog")
</template>

<script>
import { Info as BlogInfo } from '~/components/blog'

export default {
  components: {
    BlogInfo
  },
  async asyncData({ app }) {
    try {
      const {
        data: { data: blogs }
      } = await app.$axios.get('/api/v1/blog') 
      return { blogs }
    } catch(error) {
      return { blogs: [] }
    }
  },
  data() {
    return {
      blogs: [],
      selectedTab: 1
    }
  },
  methods: {
    getBlogs(format) {
      this.$axios
        .get('/api/v1/blog', { params: { format } }) 
        .then(({ data: { data: blogs }}) => {
          this.blogs = blogs
        }).catch((err) => {
          alert(err.message)
        })
    }
  }
}
</script>

