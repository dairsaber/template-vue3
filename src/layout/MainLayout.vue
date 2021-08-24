<template>
  <a-layout class="w-screen h-screen">
    <a-layout-sider v-model:collapsed="collapsed" class="top-0 left-0 h-screen overflow-auto" style="position: fixed" :trigger="null" collapsible>
      <div class="logo" />
      <!-- menu -->
      <SiderBarMenu theme="dark" />
    </a-layout-sider>
    <a-layout :style="{ marginLeft: collapsed ? '' : '200px' }">
      <!-- header -->
      <a-layout-header style="background: #fff; padding: 0">
        <menu-unfold-outlined v-if="collapsed" class="trigger" @click="() => (collapsed = !collapsed)" />
        <menu-fold-outlined v-else class="trigger" @click="() => (collapsed = !collapsed)" />
      </a-layout-header>
      <a-layout-content>
        <router-view />
      </a-layout-content>
    </a-layout>
  </a-layout>
</template>
<script lang="ts" setup>
  // import { UserOutlined, VideoCameraOutlined, UploadOutlined, MenuUnfoldOutlined, MenuFoldOutlined } from '@ant-design/icons-vue'
  import { ref } from 'vue'
  import SiderBarMenu from './components/SiderBarMenu.vue'
  const collapsed = ref<boolean>(false)
</script>
<style lang="scss" scoped>
  .logo {
    height: 32px;
    background: rgba(255, 255, 255, 0.3);
    margin: 16px;
  }
</style>
