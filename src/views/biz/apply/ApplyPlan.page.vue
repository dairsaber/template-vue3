<script lang="ts" setup>
  import PlanSearch from './components/PlanSearch.vue'
  import PlanList from './components/PlanList.vue'
  import ActionBar from './components/ActionBar.vue'
  import CheckModal from './components/CheckModal.vue'

  import { ref } from 'vue'
  import { useSearch } from '@/components/base-search'
  import { ApplyPlan } from '@/apis/biz/model/apply.model'
  import { useModal } from '@/hooks/modal/useModal'

  // start 公共列表与查询
  const listRef = ref()
  const paramsRef = ref<Partial<ApplyPlan> & QueryParams>({ status: '1' })
  const { search, reset } = useSearch(paramsRef, listRef)
  // end 公共列表与查询

  // start 新增计划
  const handleAdd = () => {}
  // end 新增计划

  //start 送审
  const [checkVisible, checkData, checkActions] = useModal<ApplyPlan>()
  const checkTitle = (record: Nullable<ApplyPlan>) => {
    if (record) {
      return `送审【${record.applyCode}】`
    } else {
      return null
    }
  }
  const handleAuth = (record: ApplyPlan) => {
    checkActions.show()
    checkActions.setData(record)
  }
  // end 送审
</script>

<template>
  <div class="space-y-2">
    <PlanSearch :listRef="listRef" v-model:params="paramsRef" @search="search" @reset="reset" />
    <a-card>
      <ActionBar @add="handleAdd" class="mb-2" />
      <PlanList ref="listRef" :params="paramsRef" @auth="handleAuth" />
    </a-card>
    <CheckModal :visible="checkVisible" :dataSource="checkData" :title="checkTitle" @cancel="checkActions.close" />
  </div>
</template>

<style lang="scss" scoped></style>
