<template>
  <a-tabs v-model:activeKey="activeKey">
    <a-tab-pane key="1" tab="Tab 1">
      <div class="space-x-4 space-y-4" />
    </a-tab-pane>
  </a-tabs>
</template>
<script lang="ts" setup>
  import { ref } from 'vue'
  const activeKey = ref<string>('1')
</script>
