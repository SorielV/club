<template lang="pug">
  article.media.comment-border
    figure.media-left
      p.image.is-64x64
        img(:src="comment.profileImage || 'https://cdn2.iconfinder.com/data/icons/nodejs-1/512/nodejs-512.png'")
    .media-content
      .content
        p
          strong {{ comment.firstName }}
          small # {{ comment.username }}
          small -
          br
          | {{ comment.comment }}
      nav.level
        .level-left
          a.level-item
            span.icon.is-small
              i.mdi.mdi-heart
            | 1000
    .media-right
      button.delete
</template>

<script>
export default {
  props: {
    readOnly: {
      type: Boolean,
      required: false,
      default: () => false
    },
    comment: {
      type: Object,
      required: false,
      default: () => {
        return {
          id: 1,
          comment: 'Sample',
          idUser: 1,
          username: 'Soriel',
          profileImage: '/public/profile/soriel.jpg',
          createdAt: '2019-01-08T00:00:00.000Z'
        }
      }
    },
  },
  methods: {
    // TODO Commnent CRUD
    onEdit() {
      this.$emit('onEdit', this.comment)
    },
    onUpdate() {
      this.$emit('onUpdate', this.comment)
    },
    onDelete() {
      this.$emit('onDelete', this.comment)
    },
    onReport() {
      this.$emit('onReport', this.comment)
    },
    onLikeOption() {
      this.$emit('onLikeOption', this.comment)
    }
  }
}
</script>

<style scoped
.comment-border {
  background-color: white;
  -webkit-box-shadow: 0 2px 3px rgba(10, 10, 10, 0.1), 0 0 0 1px rgba(10, 10, 10, 0.1);
  box-shadow: 0 2px 3px rgba(10, 10, 10, 0.1), 0 0 0 1px rgba(10, 10, 10, 0.1);
  color: #4a4a4a;
}
</style>
