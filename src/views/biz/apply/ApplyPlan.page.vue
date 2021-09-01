<script lang="ts" setup>
  import PlanSearch from './components/PlanSearch.vue'
  import PlanList from './components/PlanList.vue'
  import ActionBar from './components/ActionBar.vue'
  import CheckModal from './components/CheckModal.vue'
  import DetailModal from './components/CheckModal.vue'
  import PlanFormModal from './components/PlanFormModal.vue'

  import { ref } from 'vue'
  import { useSearch } from '@/components/base-search'
  import { ApplyPlan } from '@/apis/biz/model/apply.model'
  import { useModal } from '@/hooks/modal/useModal'

  // start 公共列表与查询
  const listRef = ref()
  const paramsRef = ref<Partial<ApplyPlan> & QueryParams>({ status: '1' })
  const { search, reset } = useSearch(paramsRef, listRef)
  // end 公共列表与查询

  //start 送审
  const [checkVisible, checkData, checkActions] = useModal<ApplyPlan>()
  const checkTitle = (record: Nullable<ApplyPlan>) => (record ? `送审【${record.applyCode}】` : null)
  const handleAuth = (record: ApplyPlan) => {
    checkActions.show()
    checkActions.setData(record)
  }
  // end 送审

  // start 详情
  const [detailVisible, detailData, detailActions] = useModal<ApplyPlan>()
  const detailTitle = (record: Nullable<ApplyPlan>) => (record ? `详情【${record.applyCode}】` : null)
  const handleDetail = (record: ApplyPlan) => {
    detailActions.setData(record)
    detailActions.show()
  }
  // end 详情

  // start 计划
  const [planVisible, planData, planActions] = useModal<ApplyPlan>()
  const planTitle = (record: Nullable<ApplyPlan>) => (record ? `编辑计划【${record.applyCode}】` : '新增计划')

  const handleAdd = () => {
    planActions.setData(null)
    planActions.show()
  }

  const handleEdit = (record: ApplyPlan) => {
    planActions.setData(record)
    planActions.show()
  }
  // end 计划
</script>

<template>
  <div class="space-y-2">
    <!-- 搜索bar -->
    <PlanSearch :listRef="listRef" v-model:params="paramsRef" @search="search" @reset="reset" />
    <a-card>
      <!-- 操作bar -->
      <ActionBar @add="handleAdd" class="mb-2" />
      <!-- 主表 -->
      <PlanList ref="listRef" :params="paramsRef" @auth="handleAuth" @detail="handleDetail" @edit="handleEdit" />
    </a-card>
    <!-- 审核modal -->
    <CheckModal :visible="checkVisible" :dataSource="checkData" :title="checkTitle" @cancel="checkActions.close" okText="送审" />
    <!-- 详情modal -->
    <DetailModal :visible="detailVisible" :dataSource="detailData" :title="detailTitle" @cancel="detailActions.close" />
    <!-- 新建计划 -->
    <PlanFormModal :visible="planVisible" :dataSource="planData" :title="planTitle" @cancel="planActions.close" />
  </div>
</template>

<style lang="scss" scoped></style>
