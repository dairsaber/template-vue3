import NProgress from 'nprogress'
import 'nprogress/nprogress.css'
import { message } from 'ant-design-vue'

import router, { whiteList } from '@/route'
import { RouteLocationNormalized } from 'vue-router'
import { usePermissionStore } from '@/store/modules/permission.store'
import { useUserStore } from '@/store/modules/user.store'
NProgress.configure({ showSpinner: false })

router.beforeEach(async (to: RouteLocationNormalized, _: RouteLocationNormalized, next: any) => {
  NProgress.start()

  const permissionStore = usePermissionStore()
  const userStore = useUserStore()

  if (userStore.token) {
    if (to.path === '/login') {
      next({ path: '/' })
      NProgress.done()
    } else {
      if (userStore.roles.length === 0) {
        try {
          await userStore.getUserInfo()
          const accessRoutes = await permissionStore.setRoutes()

          console.log(accessRoutes)
          accessRoutes.forEach((route) => {
            console.log(route, '==================================')
            router.addRoute(route)
          })
          // Hack: ensure addRoutes is complete
          // Set the replace: true, so the navigation will not leave a history record
          next({ ...to, replace: true })
        } catch (err) {
          console.error(err)
          // Remove token and redirect to login page
          userStore.resetToken()
          message.error(err || '发生错误')
          next(`/login?redirect=${to.path}`)
          NProgress.done()
        }
      } else {
        next()
      }
    }
  } else {
    // 白名单用 路由名称决定
    if (whiteList.indexOf(to.name as string) !== -1) {
      next()
    } else {
      next(`/login?redirect=${to.path}`)
      NProgress.done()
    }
  }
})

router.afterEach(() => {
  NProgress.done()

  // set page title
  // document.title = getPageTitle(to.meta.title)
})
