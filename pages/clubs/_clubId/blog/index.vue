<template lang="pug">
  section.section
    .container
      div.is-flex
        h1.title Blogs
        button.button.is-danger(
          v-if="$store.state.isAuth && $store.getters.isMemberOfClub(clubId)"
          @click="gotoCreateBlog"
        ) Add
      hr
      section
        BlogListView(
          :fetch='true'
          :fetchParams="{ idClub: clubId, format: 'info'}"
          @click="gotoBlog(blog)"
        )
        // Debug
          b-tabs.block(
            expanded
            position='is-centered'
            v-model="selectedTab"
          )
            b-tab-item(label='raw')
              section(v-for="blog in blogs")
                pre(@click="gotoBlog(blog)") {{ blog }}
                br
            b-tab-item(label='component')
              BlogListView(
                :fetch='true'
                :fetchParams="{
                  idClub: clubId,
                  format: 'info''
                }"
                @click="gotoBlog(blog)"
              )
</template>

<script>
import { ListView as BlogListView } from '@/components/blog'

const slugify = (text) => {
  return text
    .toString()
    .toLowerCase()
    .replace(/\s+/g, '-') // Replace spaces with -
    .replace(/[^\w\-]+/g, '') // Remove all non-word chars
    .replace(/\-\-+/g, '-') // Replace multiple - with single -
    .replace(/^-+/, '') // Trim - from start of text
    .replace(/-+$/, '') // Trim - from end of text
}

export default {
  layout: 'club',
  components: {
    BlogListView
  },
  head() {
    return {
      title: 'Club'
    }
  },
  // TODO: Lazy loading [Skeleton ref= http://danilowoz.com/create-content-loader/]
  /*async fetch ({ store, params: { clubId } }) {
    try {
      if (!store.getters.hasClubInformation(clubId)) {
        await store.dispatch('getClub', clubId)
      }
    } catch(err) {
      window.alert(err)
    }
  },*/
  data() {
    const clubId = this.$route.params.clubId
    return {
      clubId: clubId,
      club: this.$store.getters.getClub(clubId),
      
      selectedTab: 1,
      modals: {
        blog: {
          isActive: false,
          isLoading: false,
          data: {}
        }
      }
    }
  },
  async mounted() {
    const { clubId } = this

    try {
      if (!this.$store.getters.hasClubInformation(clubId)) {
        await this.$store.dispatch('getClub', clubId)
        this.club = this.$store.getters.getClub(clubId)
      } else {
        this.club = this.$store.getters.getClub(clubId)
      }
    } catch(err) {
      alert(err.message)
    }
  },
  methods: {
    slugify(word) {
      return slugify(word)
    },
    // Mostrar modal crear blog
    gotoCreateBlog() {
      const { clubId } = this
      this.$router.push(
        `/clubs/${clubId}/blog/create`
      )
    },
    gotoBlog({ id: blogId }) {
      const { clubId } = this
      this.$router.push(
        `/clubs/${clubId}/blog/${blogId}`
      )
    }
  }
}
</script>

