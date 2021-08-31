<script lang="ts" setup>
  const emit = defineEmits(['add'])
</script>

<template>
  <a-space size="small">
    <a-button size="small" @click.stop="emit('add')" type="primary">
      <template #icon>
        <base-icon icon="PlusOutlined" />
      </template>
      新增计划
    </a-button>
  </a-space>
</template>

<style lang="scss" scoped></style>
