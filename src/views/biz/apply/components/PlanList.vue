<script lang="tsx" setup>
  import { defineColumns, renderGoTo } from '@/utils/component/table.utils'
  import { getApplyPlans } from '@/apis/biz/apply.api'
  import { ApplyPlan } from '@/apis/biz/model/apply.model'
  import { ref, useAttrs } from 'vue'
  import { usePlanListOperation } from '../hook/usePlanListOperation'

  const attrs = useAttrs()
  const emit = defineEmits(['auth', 'edit', 'delete', 'detail'])

  const { operationColumn } = usePlanListOperation(emit)

  const columns = defineColumns<ApplyPlan>([
    {
      title: '申报单号',
      dataIndex: 'applyCode',
      align: 'center',
      customRender: ({ text }) => {
        return renderGoTo(text, 'https://www.baidu.com')
      },
      fixed: 'left',
    },
    { title: '申请时间', dataIndex: 'createTime' },
    { title: '申请单位', dataIndex: 'applyCrop' },
    { title: '所属仓库', dataIndex: 'repository' },

    // { title: '审核人', dataIndex: 'checkUser' },
    // { title: '审核状态', dataIndex: 'checkStatus' },
    // { title: '工程编码', dataIndex: 'projectCode' },
    // { title: '工程名称', dataIndex: 'projectName' },
    { title: '申报人', dataIndex: 'applyUser' },
    { title: '项目经理', dataIndex: 'projectManager' },
    // { title: '制表日期', dataIndex: 'formCreateDate' },
    { title: '状态', dataIndex: 'status', customRender: ({ text }) => <dict-tag dict="sys_test" value={text} /> },
    { title: '备注', dataIndex: 'remark', ellipsis: true, width: 100, align: 'center' },
    operationColumn,
  ])
  const listRef = ref()
  const rowKey = (record: ApplyPlan) => record.id

  defineExpose({
    search: () => {
      listRef.value.search()
    },
  })
</script>

<template>
  <base-list v-bind="attrs" :columns="columns" :action="getApplyPlans" :rowKey="rowKey" ref="listRef" :scroll="{ x: 1500 }"> </base-list>
</template>

<style lang="scss" scoped></style>
