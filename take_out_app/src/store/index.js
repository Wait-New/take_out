import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    defaultActive: 'home',
    userInfo: {},
    cartInfo: {},
    shopInfo: {}
  },
  mutations: {
    setUserInfo (state, data) {
      state.userInfo = { ...data }
    },
    setCartInfo (state, cl) {
      state.cartInfo = { ...cl }
    },
    setShopInfo (state, si) {
      state.shopInfo = { ...si }
    }
  },
  actions: {
    async getUserInfo (context) {
      if (Vue.$cookies.isKey('user_id')) {
        const { data: res } = await Vue.prototype.$axios.get('/v1/users', {
          params: {
            user_id: Vue.$cookies.get('user_id')
          }
        })
        if (res.code === 20000) {
          context.commit('setUserInfo', res.data)
        }
      }
    }
  },
  modules: {
  }
})
