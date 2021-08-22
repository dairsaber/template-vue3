<script lang="tsx">
  import type { RemoteRoute } from '@/apis/sys/model/remoteRoute.model'
  import { isUrl } from '@/utils/is'
  import { computed, defineComponent } from 'vue'
  import { useRoute, useRouter } from 'vue-router'
  import { useMenu } from '../hooks/useMenu'

  export type MenuProps = {
    theme: 'dark' | 'light'
  }
  type MenuSelectHanlder = ({ item, key }: { item: RemoteRoute; key: string }) => void
  export default defineComponent({
    setup(props: MenuProps) {
      const menuConfig = useMenu(props)

      // 当前激活key
      const route = useRoute()
      const currentKey = computed(() => [route.path])
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
      return () => (
        <a-menu onSelect={handleSelect} selectedKeys={currentKey.value} theme={props.theme} mode="inline">
          {menuConfig.value.components}
        </a-menu>
      )
    },
  })
</script>
