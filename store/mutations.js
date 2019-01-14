const mutations = {
  login: (state, { token, ...user }) => {
    state.isAuth = true
    state.token = token
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
