import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import Nest from '@/components/Nest'
Vue.use(Router)
export default new Router({
  routes: [{
    path: '/',
    name: 'HelloWorld',
    component: HelloWorld
  }, {
    path: '/nest',
    name: 'nest',
    component: Nest
  }
]
})
