<template lang="pug">
  .card.large
    .card-image
      figure.image
        img(src='https://code.support/wp-content/uploads/2016/04/js.png', alt='Image')
    .card-content
      .media
        .media-left
          figure.image.is-96x96
            img(src='https://cdn2.iconfinder.com/data/icons/nodejs-1/512/nodejs-512.png', alt='Image')
        .media-content
          p.title.is-4.no-padding {{ club.identifier }}
          p
            span.title.is-6
              a(href='http://twitter.com/#') {{ '#' + club.username }}
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
  height: 600px;
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
#flow span {
  display: block;
  width: 200vw;
  height: 200vw;
  position: absolute;
  top: -180vw;
  left: -50vw;
  border-radius: 90vw;
  opacity: 0.6;
}
.flow-1 {
  background: #3281ff;
  -webkit-animation: rotating 20s linear infinite;
  -moz-animation: rotating 20s linear infinite;
  -ms-animation: rotating 20s linear infinite;
  -o-animation: rotating 20s linear infinite;
  animation: rotating 20s linear infinite;
}
.flow-2 {
  background: #f442ee;
  position: absolute;
  -webkit-animation: rotating 15s linear infinite;
  -moz-animation: rotating 15s linear infinite;
  -ms-animation: rotating 15s linear infinite;
  -o-animation: rotating 15s linear infinite;
  animation: rotating 15s linear infinite;
}
.flow-3 {
  background: #42eef4;
  position: absolute;
  -webkit-animation: rotating 7s linear infinite;
  -moz-animation: rotating 7s linear infinite;
  -ms-animation: rotating 7s linear infinite;
  -o-animation: rotating 7s linear infinite;
  animation: rotating 7s linear infinite;
}
@-webkit-keyframes rotating {
  from {
    -ms-transform: rotate(0deg);
    -moz-transform: rotate(0deg);
    -webkit-transform: rotate(0deg);
    -o-transform: rotate(0deg);
    transform: rotate(0deg);
  }
  to {
    -ms-transform: rotate(360deg);
    -moz-transform: rotate(360deg);
    -webkit-transform: rotate(360deg);
    -o-transform: rotate(360deg);
    transform: rotate(360deg);
  }
}
@keyframes rotating {
  from {
    -ms-transform: rotate(0deg);
    -moz-transform: rotate(0deg);
    -webkit-transform: rotate(0deg);
    -o-transform: rotate(0deg);
    transform: rotate(0deg);
  }
  to {
    -ms-transform: rotate(360deg);
    -moz-transform: rotate(360deg);
    -webkit-transform: rotate(360deg);
    -o-transform: rotate(360deg);
    transform: rotate(360deg);
  }
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
