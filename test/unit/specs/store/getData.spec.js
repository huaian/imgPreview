import {store} from '@/store'
describe('store', () => {
  it('should render correct contents', (done) => { // 供异步调用
    store.state.data = null
      expect(store.state.data).toEqual(null) // 检查state状态
    store.dispatch('getData').then(() => {
      expect(store.state.data.id).toEqual(1) // 检查state状态
      done() // 异步触发断言的方式
    })
  })
})
