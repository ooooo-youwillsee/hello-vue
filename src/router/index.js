import Vue from 'vue'
import Router from 'vue-router'
// import App from '@/App'
// import Demo from '@/Demo'
// import LearnSlot from '@learn/02/Index'
// import LearnMytable from '@learn/03/Index'
// import LearnProvideInject from '@learn/05/A'
// import LearnDisplayContainer from '@learn/learn-css/01/Index'
// import ElTableBugScope from '@bug/el-table-bug/index'
// import learnVuex from '@learn/learn-vuex/dept/index'
// import viewApply from '@/pages/temp/viewApply/Index.vue'

import settings from './settings'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      redirect: settings[0]
    },
    ...settings
  ]
})
