import Vue from 'vue'
import Vuex from 'vuex'
import {getData} from '@/Utils/dataFetcher'
// 如果在模块化构建系统中，请确保在开头调用了 Vue.use(Vuex)
Vue.use(Vuex)
export const store = new Vuex.Store({
  state: {
    count: 0,
    data: ''
  },
  mutations: {
    increment (state) {
      state.count++
    },
    updateData (state, data) {
      state.data = data
    }
  },
  actions: {
    async getData (context) {
      let data = await getData()
      context.commit('updateData', data.data)
    }
  }
})