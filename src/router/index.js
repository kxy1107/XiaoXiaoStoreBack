import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/page/Login'
import UserInfo from '@/page/UserInfo'
// import BrandMenagement from '@/page/BrandMenagement'
import ConnectManagement from '@/page/ConnectManagement'
import TypeMenagement from '@/page/TypeMenagement'
import SubTypeMenagement from '@/page/SubTypeMenagement'
import AttributeManagement from '@/page/AttributeManagement'
import AttributeValueManagement from '@/page/AttributeValueManagement'
import ShopInfoManagement from '@/page/ShopInfoManagement'
import ShopInfoDetail from '@/page/ShopInfoDetail'


Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Login',
      component: Login
    },
    {
      path: '/UserInfo',
      name: 'UserInfo',
      component: UserInfo
    },
    // {
    //   path: '/BrandMenagement',
    //   name: 'BrandMenagement',
    //   component: BrandMenagement
    // },
    {
      path: '/ConnectManagement',
      name: 'ConnectManagement',
      component: ConnectManagement
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
    {
      path: '/AttributeManagement',
      name: 'AttributeManagement',
      component: AttributeManagement
    },
    {
      path: '/AttributeValueManagement',
      name: 'AttributeValueManagement',
      component: AttributeValueManagement
    },
    {
      path: '/ShopInfoManagement',
      name: 'ShopInfoManagement',
      component: ShopInfoManagement
    },
    {
      path: '/ShopInfoDetail',
      name: 'ShopInfoDetail',
      component: ShopInfoDetail
    },
  ]
})
