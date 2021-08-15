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
  <div>{{ dateStr }}</div>
</template>
