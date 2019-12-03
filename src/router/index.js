import Vue from 'vue'
import Router from 'vue-router'
import App from '@/App'
import LearnSlot from '@/learn-slot/Index'
import LearnMytable from '@/learn-mytable/Index'
import LearnfunctionalComponent from '@/learn-functional-component/A'

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
    }
  ]
})
