import Vue from 'vue'
import Histories from '@/components/Histories'
import historiesData from '../../../server/data/histories'
describe('Pagination.vue', () => {
  it('分页参数正确', () => {
    const Constructor = Vue.extend(Histories)
    const vm = new Constructor({
      propsData: historiesData
    }).$mount()
    expect(vm.$el.querySelector('.hello h1').textContent)
      .toEqual('Welcome to Your Vue.js App')
  })
  it('', () => {
  })
})
