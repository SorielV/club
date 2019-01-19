<template lang="pug">
  section
    template(v-for="blog in blogs" :key="blog.id")
      BlogInfo(:blog="blog" @report="reportBlog")
    // Redireccion, etc
    slot(name="footer")
</template>

<script>
import BlogInfo from './info'

// Lista de Blogs 
export default {
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
      default: () => true
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
  components: {
    BlogInfo
  },
  methods: {
    // TODO Report Method
    reportBlog () {

    }
  }
}
</script>

