import Vue from 'vue'
import Router from 'vue-router'
import settings from './settings'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'index',
      component: () => import('@/pages/index/Index')
    },
    ...settings
  ]
})
