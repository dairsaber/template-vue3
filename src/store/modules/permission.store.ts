import type { RemoteRoute } from '@/apis/sys/model/remoteRoute.model'
import type { AppRouteRecordRaw } from '@/@types/route/route'
import { getRoutesList } from '@/apis/sys/menu.api'
import { defineStore } from 'pinia'
import Layout from '@/layout/MainLayout.vue'
import ParentView from '@/layout/ParentView.vue'
import constantRoutes from '@/route/constant.route'
import { isString, isUrl } from '@/utils/is'

const modules = import.meta.glob('../../views/*/*.page.vue')
export type MenuRoute = RemoteRoute & {
  // 全路径
  fullPath: string
  children: MenuRoute[]
  // 路径层级Id数组
  allPath: string[]
}
export type PermissionState = {
  routes: MenuRoute[]
}

export const usePermissionStore = defineStore({
  id: 'permission',
  // a function that returns a fresh state
  state: (): PermissionState => ({
    routes: [],
  }),

  // optional actions
  actions: {
    async setRoutes(): Promise<RemoteRoute[]> {
      const res = await getRoutesList()

      const menus = res.data ?? []
      const routes = menus.concat(constantRoutes as RemoteRoute[])

      this.routes = asyncJsonRoutes(routes)
      return this.routes

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
// TODO 前端菜单权限还没做
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

export const asyncJsonRoutes = (routes: RemoteRoute[], basePath = '', allPath: string[] = []): MenuRoute[] => {
  // 对url地址进行特殊处理
  const asyncRouters = routes.map((route: MenuRoute) => {
    if (route.component && isString(route.component)) {
      if (route.component === 'Layout') {
        route.component = Layout
      } else if (route.component === 'ParentView') {
        route.component = ParentView
      } else {
        route.component = loadView(route.component)
      }
    }

    // 组装fullPath
    const fullPath = getFullPath(route, basePath)
    route.fullPath = fullPath
    // 存储全部层级的路径地址
    const currentAllPath = [...allPath, fullPath]
    route.allPath = currentAllPath
    // 如果有子路由，递归添加
    if (route.children && route.children.length) {
      asyncJsonRoutes(route.children, fullPath, currentAllPath)
    }

    return route
  })
  return asyncRouters
}

const loadView = (view: string) => {
  const viewReg = view.replace('index', 'Index')
  return modules[`../../views/${viewReg}.vue`]
}
function getFullPath(route: RemoteRoute, basePath: string): string {
  let path = route.path
  let fullPath: string
  if (isUrl(path)) {
    fullPath = path
  } else {
    path = path.replace('/', '')
    basePath = basePath.replace(/\/*$/, '')
    fullPath = `${basePath}/${path}`
  }
  return fullPath
}
