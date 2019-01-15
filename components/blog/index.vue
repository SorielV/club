<!--template lang="pug">
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
</template-->

<template lang="pug">
  .blog-container
    .blog-header
      .blog-cover
        .blog-author
          h3 {{ blog.idUser }}
    .blog-body
      br
      .content
        h1.title
          a(href='#') {{ blog.title }}
        p {{ blog.content }}
      .tags
        span(v-for="tag in blog.tag").tag.is-light {{ tag.tag }}
        span(v-for="topic in blog.topic").tag.is-dark {{ topic.topic }}
    .blog-footer
      .container
        .has-text-centered
          p Some information
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
.blog-container {
  background: #fff;
  border-radius: 5px;
  box-shadow: rgba(0, 0, 0, 0.2) 0 4px 2px -2px;
  font-family: "adelle-sans", sans-serif;
  font-weight: 100;
  margin: 48px auto;
  width: 20rem;
}
@media screen and (min-width: 480px) {
  .blog-container {
    width: 28rem;
  }
}
@media screen and (min-width: 767px) {
  .blog-container {
    width: 40rem;
  }
}
@media screen and (min-width: 959px) {
  .blog-container {
    width: 50rem;
  }
}

.blog-container a {
  color: #4d4dff;
  text-decoration: none;
  transition: .25s ease;
}
.blog-container a:hover {
  border-color: #ff4d4d;
  color: #ff4d4d;
}

.blog-cover {
  background: url("https://s3-us-west-2.amazonaws.com/s.cdpn.io/17779/yosemite-3.jpg");
  background-size: cover;
  border-radius: 5px 5px 0 0;
  height: 15rem;
  box-shadow: inset rgba(0, 0, 0, 0.2) 0 64px 64px 16px;
}

.blog-author,
.blog-author--no-cover {
  margin: 0 auto;
  padding-top: .125rem;
  width: 80%;
}

.blog-author h3::before,
.blog-author--no-cover h3::before {
  background: url("https://s3-us-west-2.amazonaws.com/s.cdpn.io/17779/russ.jpeg");
  background-size: cover;
  border-radius: 50%;
  content: " ";
  display: inline-block;
  height: 32px;
  margin-right: .5rem;
  position: relative;
  top: 8px;
  width: 32px;
}

.blog-author h3 {
  color: #fff;
  font-weight: 100;
}

.blog-author--no-cover h3 {
  color: #999999;
  font-weight: 100;
}

.blog-body {
  margin: 0 auto;
  width: 80%;
}
</style>


<!--style scoped>
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
</style-->
