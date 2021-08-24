<template>
  <a-config-provider :local="zhCN">
    <AppProvider>
      <router-view />
    </AppProvider>
  </a-config-provider>
</template>

<script setup lang="ts">
  import zhCN from 'ant-design-vue/es/locale/zh_CN'
  import AppProvider from '@/components/app-provider/AppProvider.vue'
</script>
