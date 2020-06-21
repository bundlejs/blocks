import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    dynamicData: {}
  },
  mutations: {
    updateDynamicData (state, payload) {
      state.dynamicData = payload
    }
  },
  actions: {},
  modules: {}
})
