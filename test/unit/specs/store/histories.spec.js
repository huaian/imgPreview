import {store} from '@/store'
import _ from "lodash"
// import {histories} from '../../../server/data/histories'
let histories = require('../../../server/data/histories')
let localGeneratedId = +new Date()
describe('store', () => {
  it('加载历史版本列表', (done) => { // 供异步调用
    store.state.page.histories = null
    store.dispatch('GET_HISTORIES', {}).then((response) => {
      expect(store.state.page.histories).toEqual(response.bo) // 检查state状态
      done() // 异步触发断言的方式
    })
  })
  it('更新历史版本', (done) => { // 供异步调用
    store.state.page.histories = histories
    let originalLength = histories.length
    let updatedNote = '更新版本'
    let updatedId = 1
    store.dispatch('ADD_HISTORIES', {
      id: updatedId,
      data: {
        note: updatedNote
      }
    }).then((response) => {
      expect(store.state.page.histories.length).toEqual(originalLength) // 检查state状态
      let updatedItem = _.find(store.state.page.histories, (item) => (item.id === updatedId))
      expect(updatedItem.note).toEqual(updatedNote) // 检查state状态
      done() // 异步触发断言的方式
    })
  })
  it('新增历史版本', (done) => { // 供异步调用
    store.state.page.histories = histories
    let originalLength = histories.length
    let addedNote = '新增版本'
    store.dispatch('ADD_HISTORIES', {
      data: {
        id: localGeneratedId,
        note: addedNote
      },
      insertMethod: ({list, item}) => {
        list.unshift(item)
      }
    }).then((response) => {
      expect(store.state.page.histories.length).toEqual(originalLength + 1) // 检查state状态
      let newAddedItem = _.find(store.state.page.histories, (item) => (item.note === addedNote))
      expect(newAddedItem.note).toEqual(addedNote) // 检查state状态
      done() // 异步触发断言的方式
    })
  })
  it('删除历史版本', (done) => { // 供异步调用
    store.state.page.histories = histories
    let originalLength = histories.length
    store.dispatch('DELETE_HISTORIES', {id: localGeneratedId}).then((response) => {
      expect(store.state.page.histories.length).toEqual(originalLength - 1) // 检查state状态
      done() // 异步触发断言的方式
    })
  })
  // it('恢复历史版本', (done) => { // 供异步调用
  // })
})
