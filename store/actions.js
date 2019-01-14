const actions = {
  async logout() {
    try {
      await this.$axios.get('/auth/logout')
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
      } = this.$axios.post('/auth/login', { username, password })

      commit('login', data)
      return
    } catch(err) {
      alert(err.message)
      return
    }
  },
  async checkLogin() {
    try {
      const {
        data: { data }
      } = this.$axios.get('/auth/login', { username, password })

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