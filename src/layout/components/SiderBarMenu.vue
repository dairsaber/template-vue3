<script lang="tsx">
  import { debugLog } from '@/utils/log'
  import type { RemoteRoute } from '@/apis/sys/model/remoteRoute.model'
  import { usePermissionStore } from '@/store/modules/permission.store'
  import { computed, defineComponent } from 'vue'
  import { useRoute, useRouter } from 'vue-router'
  import { useMenu } from '../hooks/useMenu'

  export type MenuProps = {
    theme: 'dark' | 'light'
  }
  type MenuSelectHanlder = ({ item, key }: { item: RemoteRoute; key: string }) => void
  export default defineComponent({
    setup(props: MenuProps) {
      const menuStore = usePermissionStore()
      const getMenu = (): RemoteRoute[] => {
        let routes = menuStore.routes as RemoteRoute[]
        const mainRoute = routes.find((route) => route.path === '')
        if (mainRoute) {
          const index = routes.indexOf(mainRoute)
          routes.splice(index, 1)
          routes = routes.concat(mainRoute.children || [])
        }
        return routes
      }
      const menus = getMenu()
      console.log(`menus`, menus)
      const { components, routeMap } = useMenu(menus, props)
      debugLog('routeMap', routeMap)
      // 当前激活key
      const route = useRoute()
      const currentKey = computed(() => [route.path])

      const router = useRouter()

      // TODO 这边外链配置还没有设置
      const handleSelect: MenuSelectHanlder = ({ key }) => {
        console.log(`item,key`, key)
        router.push(key)
      }
      return () => (
        <a-menu onSelect={handleSelect} selectedKeys={currentKey.value} theme={props.theme} mode="inline">
          {components}
        </a-menu>
      )
    },
  })
</script>
