<template lang="pug">
  .container
    b-tabs.block(
      v-model="selectedTab"
      position='is-centered'
    )
      b-tab-item(label='Disenio')
        // [Form] Add Club
        form(v-on:submit.prevent="onSubmit")
          // [Inputs] Add Club
          b-field(
            label="Titulo"
          )
            b-input(
              placeholder='title'
              type="text"
              required="true"
              maxlength="20"
              :has-counter="true"
              v-model="blog.title"
            )

          b-field(
            label="Slug"
          )
            b-input(
              placeholder='slug'
              type="text"
              required="true"
              maxlength="20"
              disabled="true"
              :has-counter="true"
              :value="slugify(blog.title || '')"
            )

          b-field(
            label="Descripcion"
          )
            b-input(
              placeholder='description'
              type="textarea"
              required="true"
              maxlength="255"
              :has-counter="true"
              v-model="blog.description"
            )

          b-field(
            label="Contenido"
          )
            b-input(
              placeholder='content'
              type="textarea"
              required="true"
              :has-counter="false"
              v-model="blog.content"
            )

          // Not implemented yet
          p Not implemented yet
          b-field(
            label="Temas"
          )
            b-taginput(v-model='catalogs.topics'
              :data='catalogs.filteredTopics'
              autocomplete=''
              :allow-new='false'
              field='blog.topic'
              icon='label'
              placeholder='Elige temas eg. Javascript, Ciencia, ML, etc'
              @typing='getFilteredTopics'
            )

          // Not implemented yet
          p Not implemented yet
          b-field(
            label="Tags"
          )
            b-taginput(v-model='catalogs.tags'
              :data='catalogs.filteredTags'
              autocomplete=''
              :allow-new='false'
              field='blog.tag'
              icon='label'
              placeholder='Agrega nuevos tags'
              @typing='getFilteredTags'
            )

          b-field(
            label="Visibilidad"
          )
            .select
              select(v-model="blog.visibility")
                option(:value="0") Publico
                option(:value="1") Privado
                option(:value="2") Draft
        .buttons.is-centered
          nuxt-link(:to="'/clubs/' + clubId").button.is-gray Inicio
          button.button.is-dark(v-text="blog.visibility == 2 ? 'Guardar' : 'Publicar'")
      b-tab-item(label='Preview')
        Blog(:blog="blog")
    br
    pre {{ blog }}
</template>

<script>
import Blog from '~/components/blog'

// TODO: Localstorage [Draf]
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
    Blog
  },
  data() {
    const { clubId } = this.$route.params
    return {
      // Catalogos
      clubId,
      catalogs: {
        tags: [],
        topics: [],
        filteredTags: [],
        filteredTopics: []
      },
      selectedTab: 0,
      blog: {
        title: '',
        slug: '',
        description: '',
        content: '',
        visibility: 0
      }
    }
  },
  methods: {
    getFilteredTags(text) {
      const { tags } = this.catalogs
      this.filteredTags = tags.filter(({ slug }) => {
        return slug
          .toString()
          .toLowerCase()
          .indexOf(text.toLowerCase()) >= 0
      })
    },
    getFilteredTopics(text) {
      const { topics } = this.catalogs
      this.filteredTags = topics.filter(({ slug }) => {
        return slug
          .toString()
          .toLowerCase()
          .indexOf(text.toLowerCase()) >= 0
      })
    },
    slugify(word) {
      return slugify(word)
    },
    // Agregar Blog
    onSubmit() {
      
    },
  }
}
</script>

