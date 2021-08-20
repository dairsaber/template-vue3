import { RouteRecordRaw } from 'vue-router'

import { AppRouteRecordRaw } from './types'
// 本地路由配置
const constantRoutes: AppRouteRecordRaw[] = [
  {
    path: '/login',
    name: 'Login',
    hidden: true,
    component: () => import('@/views/login/Login.vue'),
    meta: { title: '用户登录' },
  },
  {
    path: '',
    name: 'MainLayout',
    component: () => import('@/layout/MainLayout.vue'),
    redirect: '/home',
    children: [
      {
        path: 'home',
        name: 'Home',
        component: () => import('@/views/dashboard/DashBoard.vue'),
        meta: { title: '控制台' },
      },
    ],
  },

  {
    path: '/icons',
    name: 'SvgIcon',
    component: () => import('@/views/icons/SvgIcons.vue'),
    meta: { title: 'SvgIcon' },
  },
  {
    path: '/:pathMatch(.*)',
    name: 'Page404',
    hidden: true,
    component: () => import('@/views/error-page/404.vue'),
    meta: {
      title: 'page404',
      noCache: true,
    },
  },
]

export default constantRoutes as RouteRecordRaw[]
