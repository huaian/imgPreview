import Vue from 'vue'
import Vuex from 'vuex'
import _ from 'lodash'
import { getData } from '@/Utils/dataFetcher'
import { historiesResource } from '@/data/histories/index'
// 如果在模块化构建系统中，请确保在开头调用了 Vue.use(Vuex)
Vue.use(Vuex)
export const store = new Vuex.Store({
  state: {
    count: 0,
    data: '',
    page: {
      histories: []
    }
  },
  mutations: {
    increment(state) {
      state.count++
    },
    updateData(state, data) {
      state.data = data
    },
    UPDATE_HISTORIES(state, { data, id, insertMethod }) {
      if (!id) {
        if (data.id) { // 添加某项
          insertMethod({
            list: state.page.histories, 
            item: data 
          })
        } else {
          state.page.histories = data
        }
      } else if (id) { // 
        if (!data) {
          state.page.histories = _.reject(state.page.histories, (item) => (item.id === id))
        } else {
          let oldData = _.find(state.page.histories, (item) => (item.id === id))
          Object.assign(oldData, data)
        }
      }
    }
  },
  actions: {
    async getData(context) {
      let data = await getData()
      context.commit('updateData', data.data.bo)
    },
    async GET_HISTORIES(context, { id }) { // 查
      let response = await historiesResource.get({
        id
      })
      context.commit('UPDATE_HISTORIES', {
        data: response.data.bo
      })
      return response.data
    },
    async DELETE_HISTORIES(context, { id }) {
      let response = await historiesResource.delete({
        id
      })
      context.commit('UPDATE_HISTORIES', {
        id,
        data: null
      })
      return response.data
    },
    async ADD_HISTORIES(context, { id, data, insertMethod }) {
      let response = await historiesResource.add({
        id,
        data
      })
      context.commit('UPDATE_HISTORIES', { 
        data: response.data.bo,
        id,
        insertMethod
      })
      return response.data
    }
  }
})