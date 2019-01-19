const getters = {
  user: state => state.user,
  isAuth: state => state.isAuth,
  getClub: (state) => (id) => {
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
  },
  isMemberOfClub: (state) => (clubId) => {
    if (!state.isAuth) {
      return false
    }

    const club = []
      .concat(state.user.clubs || [])
      .find(({ idClub }) => idClub == clubId)

    return club
  }
}

export default getters
