<template lang="pug">
  section
    .card.article
      .card-content
        .media
          .media-center
            img.author-image(src='https://cdn2.iconfinder.com/data/icons/nodejs-1/512/nodejs-512.png', :alt='blog.title')
          .media-content.has-text-centered
            p.title.article-title {{ blog.title }}
            p.subtitle.is-6.article-subtitle
              a(href='#') @{{ blog.username }}
              |  {{ blog.createdAt }}
        .content.article-body
          pre {{ blog.content }}
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

<style scoped>
.articles {
  margin: 5rem 0;
  margin-top: -200px;
}
.articles .content p {
  line-height: 1.9;
  margin: 15px 0;
}
.author-image {
  position: absolute;
  top: -30px;
  left: 50%;
  width: 60px;
  height: 60px;
  margin-left: -30px;
  border: 3px solid #ccc;
  border-radius: 50%;
}
.media-center {
  display: block;
  margin-bottom: 1rem;
}
.media-content {
  margin-top: 3rem;
}
.article, .promo-block {
  margin-top: 6rem;
}
div.column.is-8:first-child {
  padding-top: 0;
  margin-top: 0;
}
.article-title {
  font-size: 2rem;
  font-weight: lighter;
  line-height: 2;
}
.article-subtitle {
  color: #909AA0;
  margin-bottom: 3rem;
}
.article-body {
  line-height: 1.4;
  margin: 0 6rem;
}
.promo-block .container {
  margin: 1rem 5rem;
}
</style>
