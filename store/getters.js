const getters = {
  user: state => state.user,
  isAuth: state => state.isAuth,
  getClub: (state) => (id) => {
    console.log(state.clubs)
    return state.clubs.find(
      ({ id: clubId }) => (
        id == clubId
      )
    )
  },
  hasClubInformation: (state) => (clubId) => {
    const index = state.clubs.findIndex(({ id }) => (
      id == clubId
    ))
    return index !== -1
  }
}

export default getters
