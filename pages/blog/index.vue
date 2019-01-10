<template lang="pug">
  section.section
    .container
      div.is-flex
        h1.title Blogs
        .buttons(style="margin: auto")
          button.button.is-white Format =>
          button.button.is-info(@click="getBlogs('simple')") Simple
          button.button.is-link(@click="getBlogs('info')") Info
          button.button.is-danger(@click="getBlogs('blog')") Blog

      hr
      div(v-for="blog in blogs")
        pre {{ blog }}
        br
</template>

<script>
export default {
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
      blogs: [1]
      
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

