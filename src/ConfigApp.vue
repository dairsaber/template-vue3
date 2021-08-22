<template>
  <a-config-provider :getPopupContainer="getPopupContainer" :local="zhCN">
    <App />
  </a-config-provider>
</template>

<script setup lang="tsx">
  import App from './App.vue'
  import zhCN from 'ant-design-vue/es/locale/zh_CN'
  const getPopupContainer = (el: HTMLElement): HTMLElement => {
    return el
  }
</script>
