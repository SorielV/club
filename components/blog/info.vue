<template lang="pug">
  section.box.mas-my-1(style="margin: 1rem")
    article.media
      figure.media-left
        p.image.is-64x64
          img(:src="blog.profileImage || 'https://cdn2.iconfinder.com/data/icons/nodejs-1/512/nodejs-512.png'")
      .media-content
        .content
          p
            strong {{ blog.firstName + ' ' }}
            small {{ '#' + blog.username }}
            small {{ '\t' + blog.createdAt }}
            br
            a.title(@click="goto") {{ blog.title }}
            p.subtitle {{ blog.description }}
          // TODO: Tag page
          .tags
            a.tag(v-for="tag in blog.tag || []") {{ tag.tag }}
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
    },
      isClub: {
      type: Boolean,
      required: false,
      default() {
        return false
      }
    }
  },
  methods: {
    goto() {
      const { clubId = null } = this.$route.params
      const { id: blogId } = this.blog
      const path = clubId
        ? `/clubs/${clubId}/blog/${blogId}`
        : `/blog/${blogId}`
      this.$router.push(path)
    }
  }
}
</script>
