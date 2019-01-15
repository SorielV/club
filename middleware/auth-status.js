export default function ({ store, redirect }) {
  if (!store.state.isAuth) {
    return store.dispatch('checkLogin')
  } else {
    return true
  }
}