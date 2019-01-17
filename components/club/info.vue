<template lang="pug">
  .card.large
    .card-image
      figure.image
        nuxt-link(:to="'/clubs/' + club.id")
          img(src='https://code.support/wp-content/uploads/2016/04/js.png', alt='Image')
    .card-content
      .media
        .media-left
          nuxt-link(:to="'/profile/' + club.username")
            figure.image.is-64x64
              img(src='https://cdn2.iconfinder.com/data/icons/nodejs-1/512/nodejs-512.png', alt='Image')
        .media-content
          nuxt-link(:to="'/clubs/' + club.id")
            p.title.is-4.no-padding {{ club.identifier }}
          p
            span.title.is-6
              nuxt-link(:to="'/profile/' + club.username") {{ '#' + club.username }}
          p.subtitle.is-6 {{ club.createdAt }}
      .content
        | {{ club.description }}
</template>

<script>
export default {
  props: {
    club: {
      type: Object,
      required: true
    }
  }
};
</script>

<style scoped>
.card {
  overflow: hidden;
}
.card.large {
  height: 500px;
  -webkit-backface-visibility: hidden;
  backface-visibility: initial;
  border-radius: 5px;
}
.media-content {
  overflow: hidden;
}
.title.no-padding {
  margin-bottom: 0 !important;
}
.rotating {
  -webkit-animation: rotating 2s linear infinite;
  -moz-animation: rotating 2s linear infinite;
  -ms-animation: rotating 2s linear infinite;
  -o-animation: rotating 2s linear infinite;
  animation: rotating 2s linear infinite;
}
.footer {
  background-color: #222831;
  color: lemonchiffon;
}
.footer p,
strong {
  color: lemonchiffon;
}
.footer a:hover {
  color: crimson;
}
.fa {
  color: lemonchiffon;
  margin: 10px;
}
</style>
