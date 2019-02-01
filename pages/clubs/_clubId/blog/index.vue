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
        // Skeleton
        div(v-show="isLoadingBlog")
          div(v-for="n in [1,2,3,4,5,6,7]")
            ContentLoader(
              :height='120'
              :width='400'
              :speed='2'
              primaryColor='#f3f3f3'
              secondaryColor='#ecebeb'
            )
              rect(x='70', y='15', rx='4', ry='4', width='117', height='6.4')
              rect(x='70', y='35', rx='3', ry='3', width='85', height='6.4')
              rect(x='0', y='80', rx='3', ry='3', width='380', height='6.4')
              rect(x='0', y='100', rx='3', ry='3', width='380', height='6.4')
              rect(x='0', y='120', rx='3', ry='3', width='350', height='6.4')
              circle(cx='30', cy='30', r='30')
        // Blog
        BlogListView(
          :fetch='true'
          :fetchParams="{ idClub: clubId, format: 'info', page: 1, limit: 10}"
          @loaded="isLoadedBlog"
          @error="loderBlogError"
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
import { ContentLoader } from "vue-content-loader"
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
    BlogListView,
    ContentLoader
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
      /* Load Layout */
      isLoadingBlog: true,
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
    isLoadedBlog() {
      this.isLoadingBlog = false
    },
    loderBlogError(err) {
      console.log(err)
      this.loadBlogError = err.message
    },
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

