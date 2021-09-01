<script lang="ts" setup>
  import { ApplyPlan } from '@/apis/biz/model/apply.model'
  import { useSearchBar } from '@/hooks/search/useSearchBar'

  const props = defineProps<{ params: QueryParams }>()
  const emit = defineEmits(['update:params', 'search', 'reset'])

  const { paramsRef, handleSearch, handleReset } = useSearchBar<ApplyPlan>(emit, props)
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
