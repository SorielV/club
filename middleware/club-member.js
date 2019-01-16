export default function ({ store, redirect, params: { clubId } }) {
  console.log(store)
  const club = store.getters.isMemberOfClub(clubId)
  if (store.state.isAuth) {
    // TODO: Pensar como hacer fecth a club de forma eficiente
    return true
  } else {
    return true
  }
}