<template>
  <a-layout class="w-screen h-screen">
    <a-layout-sider v-model:collapsed="collapsed" breakpoint="lg" class="top-0 left-0 h-screen overflow-auto" style="position: fixed" :trigger="null" collapsible>
      <div class="logo" />
      <!-- menu -->
      <SiderBarMenu theme="dark" :multiple="true" />
    </a-layout-sider>
    <a-layout :style="{ marginLeft: collapsed ? '80px' : '200px' }" class="main-layout">
      <!-- header -->
      <a-layout-header style="background-color: #fff; padding-left: 8px; padding-right: 16px">
        <div class="flex justify-between">
          <div class="space-x-4">
            <div class="inline-block text-2xl">
              <menu-unfold-outlined v-if="collapsed" class="trigger" @click="() => (collapsed = !collapsed)" />
              <menu-fold-outlined v-else class="trigger" @click="() => (collapsed = !collapsed)" />
            </div>
            <Breadcrumb class="inline-block" />
          </div>
          <UserDropdown />
        </div>
      </a-layout-header>
      <a-layout-content class="mx-4 my-6">
        <router-view />
      </a-layout-content>
    </a-layout>
  </a-layout>
</template>
<script lang="ts" setup>
  import { ref } from 'vue'
  import SiderBarMenu from './components/SiderBarMenu.vue'
  import Breadcrumb from './components/Breadcrumb.vue'
  import UserDropdown from './components/UserDropdown.vue'
  const collapsed = ref<boolean>(false)
</script>
<style lang="scss" scoped>
  .logo {
    height: 32px;
    background: rgba(255, 255, 255, 0.3);
    margin: 16px;
  }
  .main-layout {
    transition: all 0.2s;
  }
</style>
