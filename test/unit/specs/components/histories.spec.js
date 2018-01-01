import Vue from 'vue'
import _ from 'lodash'
import Histories from '@/components/Histories'
import historiesData from '../../../server/data/histories'
import { mount } from 'vue-test-utils'
describe('Histories.vue', () => {
  it('渲染列表-空的状态', () => {
    const Constructor = Vue.extend(Histories)
    const vm = new Constructor({
      propsData: {
        histories: []
      }
    }).$mount()
    expect(vm.$el.querySelector('.empty-hint').textContent)
      .toEqual('没有历史记录') // 显示没有历史记录提示
  })
  it('渲染列表-不分页', () => {
    const Constructor = Vue.extend(Histories)
    const vm = new Constructor({
      propsData: {
        histories: historiesData
      }
    }).$mount()
    expect(vm.$el.querySelector('.pagination')) // 不存在分页组件
      .toEqual(null)
  })
  it('渲染列表-分页', () => {
    const Constructor = Vue.extend(Histories)
    let paginationData = _.times(11, _.constant(historiesData[0]))
    paginationData = paginationData.concat(_.times(11, _.constant(historiesData[1])))
    const vm = new Constructor({
      propsData: {
        histories: paginationData
      }
    }).$mount()
    expect(vm.$el.querySelectorAll('.pagination').length)
      .toEqual(1)
    let noteNodes = vm.$el.querySelectorAll('.note')
    Array.from(noteNodes).forEach((noteNode, i) => {
      expect(noteNode.textContent)
        .toEqual(paginationData[i].note)
    })
  })
  /**
   * @description 一切都是数据
   */
  it('渲染列表-事件-点击revert出现备注弹窗', () => {
    // 弹窗显示由弹窗自己的单元测试覆盖
    // 对于集成组件应关注是否将对应的状态数据设置正确
    // build component
    const HistoriesComponent = mount(Histories, {
      propsData: {
        histories: historiesData
      }
    })

    // set input value
    HistoriesComponent.setData({
      noteDialogOpen: false
    });

    // simulate click event
    const button = HistoriesComponent.find('button.revert') // 点击revert按钮弹出
    button.trigger('click')

    // assert list contains new item
    expect(HistoriesComponent.vm.noteDialogOpen).toEqual(true);
  })
})
