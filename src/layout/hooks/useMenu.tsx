import { RemoteRoute } from '@/apis/sys/model/remoteRoute.model'
import { antIconNames } from '@/setup/antd'
import { Component, h, computed, ref, watch, Ref } from 'vue'
import SvgIcon from '@/components/SvgIcon/SvgIcon.vue'
import type { MenuProps } from '../components/SiderBarMenu.vue'
import { SubMenu, MenuItem } from 'ant-design-vue'
import { BarsOutlined } from '@ant-design/icons-vue'
import { usePermissionStore } from '@/store/modules/permission.store'
import { Icons } from '@/setup/antd'

type MenuConfig = {
  components: Component[]
  routeMap: Recordable<RemoteRoute>
}
type SubMenuConfig = {
  component: Component
  routeMap: Recordable<RemoteRoute>
}

export const useMenu = (props: MenuProps): Ref<MenuConfig> => {
  const menuStore = usePermissionStore()

  // 将静态路由/下的menu展平在menu中
  const menus = computed((): RemoteRoute[] => {
    let routes = [...(menuStore.routes as RemoteRoute[])]
    const mainRoute = routes.find((route) => route.path === '')
    if (mainRoute) {
      const index = routes.indexOf(mainRoute)
      routes.splice(index, 1)
      routes = [...(mainRoute.children ?? []), ...routes]
    }
    return routes
  })

  const menuConfig = ref<MenuConfig>({ components: [], routeMap: {} })
  // 导出routeMap的原因是 在外面当做字典
  const generateMenu = (menus: RemoteRoute[], basePath = ''): MenuConfig => {
    const menuComponents: Component[] = []
    const routeMap: Recordable<RemoteRoute> = {}

    menus.forEach((menu) => {
      const { hidden, children } = menu

      if (hidden) return

      if (children && children.length > 0) {
        const { component, routeMap: rm } = generateSubMenu(menu, basePath)
        menuComponents.push(component)
        Object.assign(routeMap, rm)
      } else {
        const { component, routeMap: rm } = generateMenuItem(menu, basePath)
        menuComponents.push(component)
        Object.assign(routeMap, rm)
      }
    })
    return { components: menuComponents, routeMap }
  }

  const generateSubMenu = (menu: RemoteRoute, basePath: string): SubMenuConfig => {
    const { meta, children } = menu
    const path = menu.path.replace('/', '')
    const currentPath = `${basePath}/${path}`
    const { title = '未设置', icon } = meta ?? {}

    const { components, routeMap: rm } = generateMenu(children!, currentPath)
    const iconComponent = getIconComponent(icon)
    const slots: Recordable<() => Component | null> = { icon: () => iconComponent }
    const component = (
      <SubMenu key={currentPath} title={title} v-slots={slots}>
        {components}
      </SubMenu>
    )

    return { component, routeMap: { [currentPath]: menu, ...rm } }
  }

  const generateMenuItem = (menu: RemoteRoute, basePath: string): SubMenuConfig => {
    const { meta } = menu
    const path = menu.path.replace('/', '')
    const currentPath = `${basePath}/${path}`

    const { title = '未设置', icon } = meta ?? {}
    const iconComponent = getIconComponent(icon)
    const slots: Recordable<() => Component | null> = { icon: () => iconComponent }

    const component = (
      <MenuItem key={currentPath} v-slots={slots}>
        {title}
      </MenuItem>
    )

    return { component, routeMap: { [currentPath]: menu } }
  }

  const getIconComponent = (icon?: string): Component | null => {
    let iconComponent: Component = h(BarsOutlined)
    // 处理图标
    if (icon) {
      const isSvg = icon.startsWith('svg-')
      if (isSvg) {
        const iconName = icon.substring(3)
        iconComponent = <SvgIcon icon={iconName} color={props.theme === 'dark' ? '#fff' : '#000'} />
      } else if (antIconNames.includes(icon)) {
        iconComponent = h(Icons[icon])
      }
    }

    return iconComponent
  }

  watch(
    () => menuStore.routes,
    () => {
      menuConfig.value = generateMenu(menus.value)
    },
    { immediate: true }
  )

  return menuConfig
}
