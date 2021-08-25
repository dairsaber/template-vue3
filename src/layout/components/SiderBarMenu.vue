<script lang="tsx">
  import type { RemoteRoute } from '@/apis/sys/model/remoteRoute.model'
  import { isUrl } from '@/utils/is'
  import { computed, defineComponent, watchEffect, ref } from 'vue'
  import { useRoute, useRouter } from 'vue-router'
  import { useMenu } from '../hooks/useMenu'

  type MenuSelectHanlder = ({ item, key }: { item: RemoteRoute; key: string }) => void

  export default defineComponent({
    //! TSX 这边props只能这么定义 如果用ts类型推断 会推断不出来
    props: { theme: { type: String, default: 'dark' }, multiple: Boolean },
    setup(props) {
      const menuConfig = useMenu()

      // 当前激活key
      const route = useRoute()
      const currentKey = computed(() => [route.fullPath])
      const openKeysRef = ref<string[]>([])

      const setOpenKey = (selectedKey?: string, isSub = false) => {
        if (!selectedKey) {
          openKeysRef.value = []
          return
        }

        const selectedRoute = menuConfig.value.routeMap[selectedKey]
        if (isSub) {
          openKeysRef.value = selectedRoute?.allPath
        } else {
          openKeysRef.value = selectedRoute?.allPath.slice(0, -1)
        }
      }

      watchEffect(() => {
        const [selectedKey] = currentKey.value
        setOpenKey(selectedKey)
      })
      const router = useRouter()

      // 当菜单选择跳转逻辑
      const handleSelect: MenuSelectHanlder = ({ key }) => {
        const isLink = isUrl(key)
        if (isLink) {
          window.open(key, 'target')
        } else {
          router.push(key)
        }
      }
      // 绑定了openkey之后只能手动实现 只展开单个
      const handleOpenChange = (openKeys: string[]) => {
        if (props.multiple) return
        const key = openKeys.pop()
        setOpenKey(key, true)
      }
      return () => (
        <a-menu onSelect={handleSelect} selectedKeys={currentKey.value} theme={props.theme} mode="inline" v-model={[openKeysRef.value, 'openKeys']} onOpenChange={handleOpenChange}>
          {menuConfig.value.components}
        </a-menu>
      )
    },
  })
</script>
