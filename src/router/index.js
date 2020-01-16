import Vue from 'vue'
import Router from 'vue-router'
import App from '@/App'
import LearnSlot from '@learn/learn-slot/Index'
import LearnMytable from '@learn/learn-mytable/Index'
import LearnfunctionalComponent from '@learn/learn-functional-component/A'
import LearnProvideInject from '@learn/learn-provide-inject/A'
import LearnDisplayContainer from '@learn/learn-css/01/Index'
import learnDisplayInlineForm from '@learn/learn-css/02/Index'
import ElTableBugScope from '@bug/el-table-bug/index'
import learnVuex from '@learn/learn-vuex/dept/index'
import learnDisplay from '@learn/learn-display/index'
import mainContent from '@learn/learn-display/components/index'
import viewApply from '@/pages/temp/viewApply/index.vue'

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
      // 水平和垂直居中
      path: '/learn-display-container',
      component: LearnDisplayContainer
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
      // 页面布局 (header - main - footer)
      path: '/learn-display',
      component: learnDisplay,
      children: [
        {
          path: '',
          name: 'mainContent',
          component: mainContent
        }
      ]
    },
    {
      // 临时 查看申请
      path: '/temp/viewApply',
      component: viewApply
    },
    {
      // 页面样式， 行内表单和垂直表单对齐
      path: '/learn-display-inline-form',
      component: learnDisplayInlineForm
    }
  ]
})
