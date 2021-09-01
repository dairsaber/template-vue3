<script lang="ts" setup>
  import { ApplyPlan } from '@/apis/biz/model/apply.model'
  import { isString, isFunction } from '@/utils/is'

  import { computed, useAttrs } from 'vue'
  type Title = string | Fn<Nullable<ApplyPlan>, Nullable<string>>

  const attrs = useAttrs()
  const props = defineProps<{ title: Title; dataSource: Nullable<ApplyPlan> }>()

  const title = computed(() => {
    if (isString(props.title)) {
      return props.title
    } else if (isFunction(props.title)) {
      return props.title(props.dataSource)
    }
    return null
  })

  const handleOk = () => {
    // 送审
  }
</script>

<template>
  <a-modal :title="title" v-bind="attrs" @ok="handleOk" :maskClosable="false">
    <p>Some contents...</p>
    <p>Some contents...</p>
    <p>Some contents...</p>
  </a-modal>
</template>

<style lang="scss" scoped></style>
