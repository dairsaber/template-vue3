<script lang="tsx">
  import type { RemoteRoute } from '@/apis/sys/model/remoteRoute.model'
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

      // TODO 这边外链配置还没有设置
      const handleSelect: MenuSelectHanlder = ({ key }) => {
        router.push(key)
      }
      return () => (
        <a-menu onSelect={handleSelect} selectedKeys={currentKey.value} theme={props.theme} mode="inline">
          {menuConfig.value.components}
        </a-menu>
      )
    },
  })
</script>
