import { RouteRecordRaw } from 'vue-router'
import { AppRouteRecordRaw } from '@/@types/route/route'

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
      //配置在这个children下的路由将会展示在左边menu的第一层 平铺 没有嵌套
      {
        path: 'home',
        name: 'Home',
        component: () => import('@/views/dashboard/DashBoard.vue'),
        meta: { title: '控制台', icon: 'DashboardOutlined' },
      },
      {
        path: 'users',
        name: 'UserManage',
        component: () => import('@/views/user/UserManager.vue'),
        meta: { title: '用户管理', icon: 'DashboardOutlined' },
      },
      {
        path: 'icons',
        name: 'SvgIcon',
        component: () => import('@/views/icons/SvgIcons.vue'),
        meta: { title: 'SvgIcon', icon: 'svg-all' },
      },
    ],
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
