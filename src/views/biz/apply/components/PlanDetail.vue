<script lang="tsx" setup>
  import { defineCells } from '@/utils/component/detial.util'
  import { ApplyPlan } from '@/apis/biz/model/apply.model'
  import { useAttrs } from 'vue'
  import { renderCopy } from '@/utils/component/renders'

  const attrs = useAttrs()
  const cells = defineCells<ApplyPlan>({
    applyCode: { span: 2, label: '申报单号', valueRender: renderCopy },
    // 申报单号
    createTime: '申请时间',
    // 所属仓库
    repository: '所属仓库',
    // 申请单位
    applyCrop: '申请单位',
    // 审核人
    checkUser: '审核人',
    // 审核状体
    checkStatus: '审核状体',
    // 工程编码
    projectCode: '工程编码',

    // 工程名称
    projectName: '工程名称',
    // 申报人
    applyUser: '申报人',
    // 项目经理
    projectManager: '项目经理',

    // 制表日期
    formCreateDate: '制表日期',
    // 状态
    status: { label: '状态', valueRender: (value: string) => <dict-tag dict="sys_test" value={value} /> },
    // 备注
    remark: { label: '备注', span: 3 },
  })
</script>

<template>
  <base-detail v-bind="attrs" :cells="cells" title="计划详情" :column="4" />
</template>

<style lang="scss" scoped></style>
