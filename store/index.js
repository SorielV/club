import Vuex, { Store } from 'vuex'
import actions from './actions'
import getters from './getters'
import mutations from './mutations'

const store = () => new Store({
  state: () => ({
    isAuth: false,
    token: null,
    user: {},
    clubs: []
  }),
  getters,
  mutations,
  actions
})

export default store
