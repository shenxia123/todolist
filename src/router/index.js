import Vue from 'vue'
import Router from 'vue-router'
import list from '@/components/list'
import login from '@/components/login'

Vue.use(Router)

export default new Router({
  routes: [
    {
        path: '/',
        component: login
    },
    {
      path: '/todo',
      component: list
    }
  ]
})
