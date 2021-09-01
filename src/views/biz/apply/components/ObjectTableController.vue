<script lang="ts" setup>
  import { ObjectModel } from '@/apis/biz/model/object.model'
  import { defineColumns } from '@/utils/component/table.utils'
  import { ref } from 'vue'
  const dataSource = ref([])
  const columns = defineColumns<ObjectModel>([
    { dataIndex: 'code', title: '物品编号' },
    { dataIndex: 'name', title: '物品名称' },
    { dataIndex: 'rule', title: '规格' },
    { dataIndex: 'unit', title: '单位' },
    { dataIndex: 'no', title: '数量' },
    { dataIndex: 'remark', title: '备注' },
  ])
</script>

<template>
  <div class="w-full space-y-2">
    <div class="flex flex-row-reverse">
      <a-button size="small" type="primary">
        <template #icon><base-icon icon="PlusOutlined" /></template>
        新增物品
      </a-button>
    </div>
    <a-table :columns="columns" :dataSource="dataSource" :pagination="false" />
  </div>
</template>

<style lang="scss" scoped></style>
