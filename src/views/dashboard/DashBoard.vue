<script lang="ts" setup>
  import { computed, onMounted, ref } from 'vue'

  const currentDate = ref<Date>(new Date())
  const dateStr = computed(() => currentDate.value.toLocaleTimeString())

  onMounted(() => {
    setInterval(() => {
      currentDate.value = new Date()
    }, 1000)
  })
</script>

<template>
  <div class="display">{{ dateStr }}</div>
</template>

<style lang="scss" scoped>
  .display {
    @apply w-32 h-8 mt-1 ml-1 text-xs leading-8 text-center bg-red-400 border-2 border-blue-100 rounded-lg;
  }
</style>
