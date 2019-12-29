import Vue from 'vue'
import Router from 'vue-router'
import App from '@/App'
import LearnSlot from '@learn/learn-slot/Index'
import LearnMytable from '@learn/learn-mytable/Index'
import LearnfunctionalComponent from '@learn/learn-functional-component/A'
import LearnProvideInject from '@learn/learn-provide-inject/A'
import LearnCss from '@learn/learn-css/Index'
import ElTableBugScope from '@bug/el-table-bug/index'
import learnVuex from '@learn/learn-vuex/dept/index'
import learnDisplay from '@learn/learn-display/index'
import mainContent from '@learn/learn-display/components/index'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'index',
      component: App
    },
    {
      path: '/learn-slot',
      name: 'LearnSlot',
      component: LearnSlot
    },
    {
      path: '/learn-mytable',
      name: 'LearnMytable',
      component: LearnMytable
    },
    {
      path: '/learn-functional-component',
      name: 'LearnfunctionalComponent',
      component: LearnfunctionalComponent
    },
    {
      path: '/learn-provide-inject',
      name: 'learnProvideInject',
      component: LearnProvideInject
    },
    {
      path: '/learn-css',
      name: 'learnCss',
      component: LearnCss
    },
    {
      path: '/el-table-bug-Scope',
      name: 'ElTableBugScope',
      component: ElTableBugScope
    },
    {
      path: '/learn-vuex',
      name: 'learnVuex',
      component: learnVuex
    },
    {
      path: '/learn-display',
      name: 'learnDisplay',
      component: learnDisplay,
      children: [
        {
          path: '',
          name: 'mainContent',
          component: mainContent
        }
      ]
    }
  ]
})
