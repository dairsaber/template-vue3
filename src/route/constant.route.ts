import { RouteRecordRaw } from 'vue-router'

import { AppRouteRecordRaw } from './types'
// 本地路由配置
const constantRoutes: AppRouteRecordRaw[] = [
  {
    path: '/login',
    name: 'Login',
    component: () => import('@/views/login/Login.vue'),
    meta: { title: '用户登录' },
  },
  {
    path: '',
    name: 'Home',
    component: () => import('@/views/dashboard/DashBoard.vue'),
    meta: { title: '控制台' },
  },
]

export default constantRoutes as RouteRecordRaw[]
