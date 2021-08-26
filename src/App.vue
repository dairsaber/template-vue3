<template>
  <ConfigProvider :locale="zh_CN">
    <router-view />
  </ConfigProvider>
</template>

<script setup lang="ts">
  import zh_CN from 'ant-design-vue/lib/locale/zh_CN'
  import { ConfigProvider } from 'ant-design-vue'
</script>
