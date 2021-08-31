<script lang="ts" setup>
  import PlanSearch from './components/PlanSearch.vue'
  import PlanList from './components/PlanList.vue'
  import ActionBar from './components/ActionBar.vue'
  import { ref } from 'vue'
  import { useSearch } from '@/components/base-search'
  import { ApplyPlan } from '@/apis/biz/model/apply.model'

  const listRef = ref()
  const paramsRef = ref<Partial<ApplyPlan> & QueryParams>({ status: '1' })
  const { search, reset } = useSearch(paramsRef, listRef)

  const handleAdd = () => {
    console.log('add')
  }
</script>

<template>
  <div class="space-y-2">
    <PlanSearch :listRef="listRef" v-model:params="paramsRef" @search="search" @reset="reset" />
    <a-card>
      <ActionBar @add="handleAdd" class="mb-2" />
      <PlanList ref="listRef" :params="paramsRef" />
    </a-card>
  </div>
</template>

<style lang="scss" scoped></style>
