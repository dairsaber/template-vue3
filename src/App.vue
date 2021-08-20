<template>
  <a-config-provider :getPopupContainer="getPopupContainer" :local="zhCN">
    <router-view />
  </a-config-provider>
</template>

<script setup lang="ts">
  import zhCN from 'ant-design-vue/es/locale/zh_CN'
  const getPopupContainer = (el: HTMLElement): HTMLElement => {
    return el
  }
</script>
