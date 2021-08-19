import type { RemoteRoute } from '@/apis/sys/model/remoteRoute.model'
import type { AppRouteRecordRaw } from '@/route/types'
import { getRoutesList } from '@/apis/sys/menu.api'
import { defineStore } from 'pinia'
import Layout from '@/layout/MainLayout.vue'
import ParentView from '@/layout/ParentView.vue'
const componentsModules = import.meta.glob('../../views/*/*.vue')

export type PermissionState = {
  routes: AppRouteRecordRaw[]
  dynamicRoutes: AppRouteRecordRaw[]
}

export const usePermissionStore = defineStore({
  id: 'permission',
  // a function that returns a fresh state
  state: (): PermissionState => ({
    routes: [],
    dynamicRoutes: [],
  }),

  // optional actions
  actions: {
    async setRoutes(): Promise<RemoteRoute[]> {
      const res = await getRoutesList()
      const menus = res.data.slice(0, 2)
      if (menus) {
        const remoteRoutes = asyncJsonRoutes(menus)
        this.routes = remoteRoutes
        return remoteRoutes
      }
      return []
    },
  },
})

const hasPermission = (roles: string[], route: AppRouteRecordRaw): boolean => {
  if (route.roles) {
    return roles.some((role) => route.roles?.includes(role))
  }
  return true
}

export const filterAsyncRoutes = (routes: AppRouteRecordRaw[], roles: string[]): AppRouteRecordRaw[] => {
  const res: AppRouteRecordRaw[] = []
  routes.forEach((route) => {
    const r = { ...route }
    if (hasPermission(roles, r)) {
      if (r.children) {
        r.children = filterAsyncRoutes(r.children, roles)
      }
      res.push(r)
    }
  })
  return res
}

export const asyncJsonRoutes = (routes: RemoteRoute[]): RemoteRoute[] => {
  const asyncRouters = routes.filter((route: RemoteRoute) => {
    if (route.component) {
      if (route.component === 'Layout') {
        route.component = Layout
      } else if (route.component === 'ParentView') {
        route.component = ParentView
      } else {
        route.component = loadView(route.component)
      }
    }
    // 如果有子路由，递归添加
    if (route.children && route.children.length) {
      asyncJsonRoutes(route.children)
    }
    return true
  })
  return asyncRouters
}

const loadView = (view: string) => {
  const viewReg = view.replace('index', 'Index')
  return componentsModules[`@/views/${viewReg}.vue`]
}
