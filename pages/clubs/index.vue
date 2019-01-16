<template lang="pug">
  section.section
    .container
      div.is-flex
        h1.title Clubs
        .buttons(style="margin: auto")
          button.button.is-white Format =>
          button.button.is-info(@click="getClubs('simple')") Simple
          button.button.is-link(@click="getClubs('complete')") Complete
          button.button.is-danger(
            v-if="$store.state.isAuth"
            @click="showModalAddClub"
          ) Add
      hr
    .container
      section
        b-tabs.block(position='is-centered')
          b-tab-item(label='raw')
            section(v-for="club in clubs")
              pre(@click="toClub(club)") {{ club }}
              br
          b-tab-item(label='component')
            template(v-if="format === 'simple'")
              .row.columns.is-multiline
                .column.is-one-third(v-for="club in clubs")
                  ClubInfo(@click="toClub(club)" :club="club")
                  br
            template(v-else)
              .row.columns.is-multiline.is-centered
                .column.is-7(v-for="club in clubs")
                  Club(@click="toClub(club)" :club="club")
                  br
            pre https://github.com/dansup/bulma-templates/blob/master/templates/cards.html
    // [Modal] Add Club
    b-modal(:active.sync='modals.club.isActive')
      // [Form] Add Club
      b-loading(
        :is-full-page="true"
        :active.sync="modals.club.isLoading"
        :can-cancel="true"
      )
      form(v-on:submit.prevent="onSubmitAddClub")
        .modal-card(style='width: auto')
          header.modal-card-head
            p.modal-card-title Add Club
          section.modal-card-body
            // [Inputs] Add Club
            b-field(
              label="Identificador"
            )
              b-input(
                placeholder='identifier'
                type="text"
                required="true"
                maxlength="20"
                :has-counter="true"
                v-model="modals.club.data.identifier"
              )

            b-field(
              label="Slug"
            )
              b-input(
                placeholder='slug'
                type="text"
                required="true"
                maxlength="20"
                disabled='true'
                :has-counter="true"
                :value="slugify(modals.club.data.identifier || '')"
              )

            b-field(
              label="Descripcion"
            )
              b-input(
                placeholder='description'
                type="textarea"
                required="false"
                maxlength="255"
                :has-counter="true"
                v-model="modals.club.data.description"
              )

            b-field(
              label="Visibilidad"
            )
              .select(v-model="modals.club.data.visibility")
                select
                  option(:value="0") Publico
                  option(:value="1") Privado
          footer.modal-card-foot
            button.button(type='button', @click='close()') Close
            button.button.is-dark Save
</template>

<script>
import { Club, Info as ClubInfo }  from '@/components/club/'

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

const timeout = (ms) => (new Promise(resolve => setTimeout(resolve, ms)))

// TODO: Remove
import axios from 'axios'
const axiosAPI = axios.create({ baseURL: '/api/v1' })

const API = new Proxy({}, {
  get: (target, name) => (
    ['get', 'delete', 'head', 'post', 'put', 'patch']
      .reduce((object, method) => {
        object[method] = (path, ...args) => axiosAPI[method](name + path, ...args)
        return object
      }, {})
  )
})

export default {
  components: {
    Club,
    ClubInfo
  },
  async asyncData({ app }) {
    try {
      const {
        data: { data: clubs }
      } = await app.$axios.get('/api/v1/club') 
      return { clubs }
    } catch(error) {
      return { clubs: [] }
    }
  },
  data() {
    return {
      format: 'simple',
      clubs: [],
      modals: {
        club: {
          isActive: false,
          isLoading: false,
          data: {
            visibility: 0,
            identifier: 'template',
            description: 'A popular club of open source projects.'
          }
        } 
      }
    }
  },
  methods: {
    slugify(text) {
      return slugify(text)
    },
    // Show modal add club
    showModalAddClub() {
      this.modals.club.isActive = true
    },
    // Hide modal add club
    closeModalAddClub(reset = false) {
      this.modals.club.isActive = false
      if (reset) {
        this.modals.club.data = {}
      }
    },
    // Handle add club
    async onSubmitAddClub() {
      // TODO: Loading on button
      this.modals.club.isLoading = true
      // Current Item
      const data = this.modals.club.data
      try {
        // Saved item
        const {
          data: { data: item }
        } = await API.club.post('', data)
        this.clubs.push(item)
      } catch(err) {
        alert(err.message)
      }
      this.modals.club.isLoading = false
    },
    toClub({ id }) {
      this.$router.push(`/clubs/${id}`)
    },
    getClubs(format) {
      this.format = format
      this.$axios
        .get('/api/v1/club', { params: { format } }) 
        .then(({ data: { data: clubs }}) => {
          this.clubs = clubs
        }).catch((err) => {
          alert(err.message)
        })
    }
  }
}
</script>

<style scoped>
</style>
