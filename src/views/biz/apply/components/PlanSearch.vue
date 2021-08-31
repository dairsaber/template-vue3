<script lang="ts" setup>
  import { ref, toRaw, watch } from 'vue'
  import { ApplyPlan } from '@/apis/biz/model/apply.model'
  // 定义事件
  const emit = defineEmits(['update:params', 'search', 'reset'])
  const paramsRef = ref<Partial<ApplyPlan> & QueryParams>({})

  const props = defineProps<{ params: QueryParams }>()
  watch(
    () => props.params,
    (val) => {
      paramsRef.value = val
    },
    {
      immediate: true,
    }
  )

  const updateParams = () => {
    emit('update:params', toRaw(paramsRef.value))
  }
  const handleSearch = () => {
    updateParams()
    emit('search')
  }
  const handleReset = () => {
    updateParams()
    emit('reset')
  }
</script>

<template>
  <a-card>
    <base-search @search="handleSearch" @reset="handleReset">
      <a-space size="small" class="mb-2 mr-2">
        <a-input placeholder="请输入申报单号" v-model:value="paramsRef.applyCode" />
        <a-input placeholder="请输入工程编号" v-model:value="paramsRef.projectCode" />
        <a-input placeholder="请输入工程名称" v-model:value="paramsRef.projectName" />
        <a-input placeholder="请输入申报单位" v-model:value="paramsRef.applyCrop" />
        <a-input placeholder="请输入项目经理名称" v-model:value="paramsRef.projectManager" />
        <dict-select dict="sys_test" style="min-width: 100px" placeholder="请选择" v-model:value="paramsRef.status" />
      </a-space>
    </base-search>
  </a-card>
</template>

<style lang="scss" scoped></style>
