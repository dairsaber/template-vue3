<script lang="ts" setup>
  import { ApplyPlan } from '@/apis/biz/model/apply.model'
  import { defineCells } from '@/utils/component/detial.util'
  import { isString, isFunction } from '@/utils/is'

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

  const cells = defineCells<ApplyPlan>({
    applyCode: { span: 2, label: '申报单号' },
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
    status: '状态',
    // 备注
    remark: { label: '备注', span: 3 },
  })

  const handleOk = () => {
    // 送审
  }
</script>

<template>
  <a-modal :title="title" v-bind="attrs" @ok="handleOk" :maskClosable="false" :width="1200">
    <base-detail :dataSource="dataSource" :cells="cells" title="xxx" :column="4" />
  </a-modal>
</template>

<style lang="scss" scoped></style>
