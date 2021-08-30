<script lang="ts" setup>
  // import { useRouter } from 'vue-router'

  import { message } from '@/utils/component/message.util'

  // const router = useRouter()
  const handleGoNotificationPage = () => {
    message.warn('TODO 此功能待开发')
    // router.push({})
  }
</script>

<template>
  <a-badge dot>
    <a @click.stop="handleGoNotificationPage"><base-icon icon="notification" class="text-lg" /></a>
  </a-badge>
</template>

<style lang="scss" scoped></style>
