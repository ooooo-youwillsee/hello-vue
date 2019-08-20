import Vue from 'vue'
import Router from 'vue-router'
import Index from '@/components/Index'
import LearnSlot from '@/learn-slot/Index'
import LearnMytable from '@/learn-mytable/Index'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'index',
      component: Index
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
    }
  ]
})
