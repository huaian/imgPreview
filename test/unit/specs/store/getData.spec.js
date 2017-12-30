import {store} from '@/store'
describe('store', () => {
  it('should render correct contents', (done) => {
    store.dispatch('getData').then(() => {
      expect(store.state.data.id).toEqual(1)
      done()
    })
  })
})
