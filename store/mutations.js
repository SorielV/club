const mutations = {
  login: (state, data) => {
    alert(JSON.stringify(data))
    const { token = null, ...user } = data
    state.isAuth = true
    state.token = token || null
    state.user = user
  },
  logout: state => {
    state.isAuth = false
    state.token = null
    state.user = {}
  },
  addClub: (state, club) => {
    state.clubs.push(club)
  }
}

export default mutations
