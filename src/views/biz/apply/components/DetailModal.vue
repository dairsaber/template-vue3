<script lang="ts" setup>
  import { ApplyPlan } from '@/apis/biz/model/apply.model'
  import { isString, isFunction } from '@/utils/is'
  import PlanDetail from './PlanDetail.vue'
  import { computed, PropType, useAttrs } from 'vue'
  type Title = string | Fn<Nullable<ApplyPlan>, Nullable<string>>

  const attrs = useAttrs()

  const props = defineProps({
    title: [String, Function] as PropType<Title>,
    dataSource: {
      type: [Object, null] as PropType<Nullable<ApplyPlan>>,
      required: true,
    },
  })

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
  <a-modal :title="title" v-bind="attrs" @ok="handleOk" maskClosable :width="1200" :footer="null">
    <PlanDetail :dataSource="dataSource" />
  </a-modal>
</template>
