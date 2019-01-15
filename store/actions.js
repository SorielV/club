const actions = {
  async logout() {
    try {
      await this.$axios.get('/api/v1/auth/logout')
      commit('logout')
      
    } catch(err) {
      alert(err.message)
      return
    }
  },
  async login({ commit, state }, { username, password }) {
    try {
      const {
        data: { data }
      } = await this.$axios.post('/api/v1/auth/login', { username, password })

      /*if (!data.token) {
        data.token = null
      }*/

      commit('login', data)
      return {}
    } catch(err) {
      alert(err.message)
      throw err
    }
  },
  async checkLogin({ commit }) {
    try {
      const {
        data: { data }
      } = await this.$axios.get('/api/v1/auth/user')

      commit('login', data)
      return
    } catch(err) {
      alert(err.message)
      return
    }
  },
  async getClub({ commit, state }, id) {
    try {
      const {
        data: { data: club }
      } = await this.$axios.get(`/api/v1/club/${id}?format=complete`)

      commit('addClub', club)
      return club
    } catch(err) {
      return {}
    }
  }
}

export default actions