<template lang="pug">
  section.box
    article.media        
      .media-content
        .content
          h1.title {{ event.title }}
          p {{ event.body }}
      .media-right
        button.delete
    .content 
</template>

<script>
export default {
  props: {
    event: {
      type: Object,
      required: true
    }
  },
  created() {
    console.log(this.event)
  }
}
</script>

