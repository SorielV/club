<template lang="pug">
  section
    section(v-for="blog in data" :key="blog.id")
      BlogInfo.blog-info(:blog="blog" @report="reportBlog")
    // Redireccion, etc
    slot(name="footer")
</template>

<script>
import BlogInfo from './info.vue'

// Lista de Blogs 
export default {
  components: {
    BlogInfo
  },
  props: {
    blogs: {
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
      data: this.blogs.slice()
    }
  },
  async created() {
    if (!this.fetch) {
      return
    }

    try {
      const { 
        data: { data: blogs }
      } = await this.$axios.get('/api/v1/blog', {
          params: this.fetchParams
        })

      this.data = blogs
      this.$emit('loaded')
    } catch(err) {
      this.$emit('error', err)
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
.blog-info {
  margin-bottom: 0.75rem !important;
}
</style>
