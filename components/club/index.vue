<template lang="pug">
  // TODO: Club view
  .card.large
    .card-image
      figure.image
        img(src='https://code.support/wp-content/uploads/2016/04/js.png', alt='Image')
    .card-content
      .media
        //-.media-left
          figure.image.is-96x96
            img(src='https://cdn2.iconfinder.com/data/icons/nodejs-1/512/nodejs-512.png', alt='Image')
        //-.media-content
          p.title.is-4.no-padding {{ club.identifier }}
          p
            span.title.is-6
              a(href='http://twitter.com/#') {{ '#' + club.username }}
          p.subtitle.is-6 {{ club.createdAt }}
      section.has-m-1
        VueShowdown(
          :markdown="club.content || ''"
          flavor="github"
          :options="{ emoji: true }"
        )
</template>

<script>
// import marked from 'marked'
import { VueShowdown } from 'vue-showdown'
import { isNullOrUndefined } from 'util';

export default {
  components: {
    VueShowdown
  },
  props: {
    club: {
      type: Object,
      required: true
    }
  }
};
</script>

<style scoped>
.has-m-1 {
  margin: 1rem;
}
figure.image, img {
  max-height: 350px !important;  
}
.card {
  overflow: hidden;
}
.card.large {
  height: auto;
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
