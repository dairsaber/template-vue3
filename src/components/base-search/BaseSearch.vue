<script lang="ts" setup>
  const emit = defineEmits(['search', 'reset'])

  const handleSearch = (): void => {
    emit('search')
  }
  const handleReset = (): void => {
    emit('reset')
  }
</script>

<template>
  <div>
    <a-space :size="8">
      <slot></slot>

      <a-button type="primary" @click="handleSearch">
        <template #icon><base-icon icon="SearchOutlined" /></template>
        搜索
      </a-button>
      <a-button @click="handleReset">
        <template #icon><base-icon icon="RollbackOutlined" /></template>
        重置
      </a-button>
    </a-space>
  </div>
</template>

<style lang="scss" scoped></style>
