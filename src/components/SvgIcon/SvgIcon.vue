<template>
  <svg :class="svgClass" aria-hidden="true">
    <use :xlink:href="iconName" :fill="color" />
  </svg>
</template>
<script setup lang="ts">
  import { computed, PropType } from 'vue'
  const props = defineProps({
    icon: { type: String as PropType<string>, require: true },
    // svg自定义类名
    className: { type: String as PropType<string> },
    color: { type: String as PropType<string>, default: '#889aa4' },
  })

  const iconName = computed(() => `#svg-${props.icon}`)
  const svgClass = computed(() => (props.className ? `svg-icon ${props.className}` : 'svg-icon'))
</script>
<style lang="scss" scoped>
  .svg-icon {
    width: 1em;
    height: 1em;
    fill: currentColor;
    vertical-align: middle;
  }
</style>
