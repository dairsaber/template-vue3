import { RouteRecordRaw } from 'vue-router'
import { AppRouteRecordRaw } from '@/@types/route/route'

// 本地路由配置
const constantRoutes: AppRouteRecordRaw[] = [
  {
    path: '/login',
    name: 'Login',
    hidden: true,
    component: () => import('@/views/login/Login.page.vue'),
    meta: { title: '用户登录' },
  },
  {
    path: '',
    component: () => import('@/layout/MainLayout.vue'),
    redirect: '/home',
    meta: { title: '首页', isLayout: true, breadcrumb: false },
    children: [
      //配置在这个children下的路由将会展示在左边menu的第一层 平铺 没有嵌套
      {
        path: 'home',
        name: 'Home',
        component: () => import('@/views/dashboard/DashBoard.page.vue'),
        meta: { title: '控制台', icon: 'DashboardOutlined' },
      },

      {
        path: 'icons',
        name: 'SvgIcon',
        component: () => import('@/views/icons/SvgIcons.page.vue'),
        meta: { title: 'SvgIcon', icon: 'svg-all' },
      },
    ],
  },
  {
    path: '/system',
    component: () => import('@/layout/MainLayout.vue'),
    redirect: '/system/users',
    meta: { title: '首页', isLayout: true, breadcrumb: false },
    children: [
      {
        path: 'users',
        name: 'UserManage',
        component: () => import('@/views/user/UserManager.page.vue'),
        meta: { title: '用户管理', icon: 'DashboardOutlined' },
      },
    ],
  },
  {
    path: '/:pathMatch(.*)',
    name: 'Page404',
    hidden: true,
    component: () => import('@/views/error-page/404.page.vue'),
    meta: {
      title: 'page404',
      noCache: true,
    },
  },
]

export default constantRoutes as RouteRecordRaw[]
