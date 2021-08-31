<script lang="ts" setup>
  import { ref } from 'vue'
  import SiderBarMenu from './components/SiderBarMenu.vue'
  import Breadcrumb from './components/Breadcrumb.vue'
  import UserDropdown from './components/UserDropdown.vue'
  import Notification from './components/Notification.vue'
  // import { useRoute } from 'vue-router'
  const collapsed = ref<boolean>(false)
  // const route = useRoute()
</script>

<template>
  <a-layout class="w-screen h-screen">
    <!-- left-side -->
    <a-layout-sider v-model:collapsed="collapsed" breakpoint="lg" class="top-0 left-0 h-screen overflow-auto" style="position: fixed" :trigger="null" collapsible>
      <div class="logo" />
      <!-- menu -->
      <SiderBarMenu theme="dark" :multiple="false" />
    </a-layout-sider>
    <a-layout :style="{ marginLeft: collapsed ? '80px' : '200px' }" class="main-layout">
      <!-- header -->
      <a-layout-header class="layout-header">
        <div class="flex justify-between">
          <div class="space-x-4">
            <a-button type="ghost" shape="circle" class="inline-block text-xl" @click="() => (collapsed = !collapsed)">
              <base-icon :icon="collapsed ? 'MenuUnfoldOutlined' : 'MenuFoldOutlined'" />
            </a-button>
            <Breadcrumb class="inline-block" />
          </div>
          <div class="flex items-center">
            <Notification />
            <UserDropdown class="ml-2" />
          </div>
        </div>
      </a-layout-header>
      <!-- content -->
      <a-layout-content class="relative mx-4 my-6">
        <!-- <div class="flex space-x-4">
          <div class="w-32 h-16 text-lg text-center text-white bg-blue-500 rounded-md shadow-lg leading-16 -top-4">{{ route.meta?.title ?? '其他' }}</div>
          <div></div>
        </div> -->
        <router-view />
      </a-layout-content>
    </a-layout>
  </a-layout>
</template>
<style lang="scss" scoped>
  .logo {
    height: 32px;
    background: rgba(255, 255, 255, 0.3);
    margin: 16px;
  }
  .layout-header {
    padding-left: 8px;
    background: transparent;
    padding-right: 16px;
    height: 48px;
    line-height: 48px;
  }

  .main-layout {
    transition: all 0.2s;
  }
</style>
