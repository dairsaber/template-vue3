<script lang="ts" setup>
  import { MenuRoute } from '@/store/modules/permission.store'
  import { Breadcrumb } from 'ant-design-vue'
  import { Route } from 'ant-design-vue/es/breadcrumb/Breadcrumb'
  import { watchEffect, ref } from 'vue'
  import { useRoute, useRouter } from 'vue-router'

  const route = useRoute()
  const matchedRoutes = ref<Route[]>([])

  watchEffect(() => {
    const matched = route.matched.filter((route) => route.meta?.breadcrumb !== false)
    const routes: Route[] = [
      {
        path: '/',
        breadcrumbName: '首页',
      },
    ]
    const otherRoute = matched.map((route) => {
      const { path, meta, name } = route as unknown as MenuRoute
      const breadcrumbName = meta?.title ?? name ?? '未知'

      return { path, breadcrumbName }
    })
    matchedRoutes.value = routes.concat(otherRoute)
  })

  const router = useRouter()
  const handleGo = (breadcrumbRoute: Route) => {
    const goPath = breadcrumbRoute.path
    if (breadcrumbRoute.path === route.fullPath) return
    router.push(goPath)
  }
</script>

<template>
  <Breadcrumb>
    <a-breadcrumb-item v-for="routeItem in matchedRoutes" :key="routeItem.path">
      <a type="link" @click="handleGo(routeItem)">
        <template v-if="routeItem.breadcrumbName === '首页'"><base-icon icon="HomeOutlined" /></template>
        <span v-else>{{ routeItem.breadcrumbName }}</span>
      </a>
    </a-breadcrumb-item>
  </Breadcrumb>
</template>

<style lang="scss" scoped></style>
