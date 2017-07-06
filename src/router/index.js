import Vue from 'vue'
import Router from 'vue-router'
import UserInfo from '@/page/UserInfo'
import BrandMenagement from '@/page/BrandMenagement'
import TypeMenagement from '@/page/TypeMenagement'
import SubTypeMenagement from '@/page/SubTypeMenagement'

Vue.use(Router)

export default new Router({
  routes: [
 
     {
      path: '/',
      name: 'UserInfo',
      component: UserInfo
    },
     {
      path: '/BrandMenagement',
      name: 'BrandMenagement',
      component: BrandMenagement
    },
    {
      path: '/TypeMenagement',
      name: 'TypeMenagement',
      component: TypeMenagement
    },
    {
      path: '/SubTypeMenagement',
      name: 'SubTypeMenagement',
      component: SubTypeMenagement
    },
  ]
})
