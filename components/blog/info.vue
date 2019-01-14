<template lang="pug">
  section
    article.media
      figure.media-left
        p.image.is-64x64
          img(:src="blog.username || 'https://cdn2.iconfinder.com/data/icons/nodejs-1/512/nodejs-512.png'")
      .media-content
        .content
          p
            strong {{ blog.firstName }}
            small @{{ blog.username }}
            small {{ blog.createdAt }}
            br
            p.title {{ blog.title }}
            p.subtitle {{ blog.description }}
        nav.level.is-mobile
          .level-left
            a.level-item
              span.icon.is-small
                i.fas.fa-reply
            a.level-item
              span.icon.is-small
                i.fas.fa-retweet
            a.level-item
              span.icon.is-small
                i.fas.fa-heart
      .media-right
        button.delete
</template>

<script>
export default {
  props: {
    blog: {
      type: Object,
      required: true
    }
  }
}
</script>
