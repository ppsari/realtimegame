import Vue from 'vue'
import Router from 'vue-router'
import MainPage from '@/components/MainPage'
import Dashboard from '@/components/Dashboard'
import Playground from '@/components/Playground'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'MainPage',
      component: MainPage
    },
    {
      path: '/dashboard',
      name: 'Dashboard',
      component: Dashboard
    },
    {
      path: '/quiz',
      name: 'Playground',
      component: Playground
    }
  ]
})
