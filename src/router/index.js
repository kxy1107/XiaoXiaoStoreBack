import Vue from 'vue'
import Router from 'vue-router'
import Hello from '@/page/Hello'
import UserInfo from '@/page/UserInfo'
import BrandMenagement from '@/page/BrandMenagement'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Hello',
      component: Hello
    },
     {
      path: '/UserInfo',
      name: 'UserInfo',
      component: UserInfo
    },
     {
      path: '/BrandMenagement',
      name: 'BrandMenagement',
      component: BrandMenagement
    }
  ]
})
