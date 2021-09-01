<script lang="ts" setup>
  import { ApplyPlan } from '@/apis/biz/model/apply.model'
  import { isString, isFunction } from '@/utils/is'
  import { Form } from 'ant-design-vue'
  import { computed, PropType, reactive, ref, toRaw, useAttrs, watch } from 'vue'
  import ObjectTableController from './ObjectTableController.vue'

  type Title = string | Fn<Nullable<ApplyPlan>, Nullable<string>>
  type ExtraCode = { objects?: Recordable[] }

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

  // start 表单
  // const labelCol = { span: 4 }
  // const wrapperCol = { span: 18 }
  const loadingRef = ref(false)
  const currentDate = new Date().toLocaleDateString()
  const modelRef = ref<Partial<ApplyPlan> & ExtraCode>({
    objectType: '',
    applyCode: '',
    createTime: currentDate,
    formCreateDept: '总工办',
    applyUser: '',
    formCreateDate: currentDate,
    formCreateUser: '管理员',
    applyCrop: '',
    projectCode: '',
    projectName: '',
    applyGroup: '',
    projectManager: '',
    remark: '',
    objects: [],
  })
  const rulesRef = reactive({
    objectType: [{ required: true, message: '物料类型必填' }],
    applyCrop: [{ required: true, message: '申报单位必填' }],
  })

  const { validate, validateInfos } = Form.useForm(modelRef, rulesRef)
  watch(
    () => props.dataSource,
    (val) => {
      modelRef.value = val ?? {}
    }
  )

  // 提交
  const handleOk = async () => {
    try {
      loadingRef.value = true
      await validate()
      console.log(`value`, toRaw(modelRef))
    } catch (error) {
      console.error(error)
    }
    loadingRef.value = false
  }
</script>

<template>
  <a-modal :title="title" v-bind="attrs" @ok="handleOk" maskClosable :width="800">
    <a-form layout="vertical">
      <a-row :gutter="16">
        <a-col :span="12">
          <a-form-item label="物料类型" v-bind="validateInfos.objectType"><a-input v-model:value="modelRef.objectType" /></a-form-item>
        </a-col>
        <a-col :span="12">
          <a-form-item label="物料类型" v-bind="validateInfos.objectType"> <a-input v-model:value="modelRef.objectType" /> </a-form-item>
        </a-col>
        <a-col :span="12">
          <a-form-item label="申报单号" v-bind="validateInfos.applyCode"> <a-input v-model:value="modelRef.applyCode" /> </a-form-item>
        </a-col>
        <a-col :span="12">
          <a-form-item label="申报日期" v-bind="validateInfos.createTime"> <a-input v-model:value="modelRef.createTime" /> </a-form-item>
        </a-col>
        <a-col :span="12">
          <a-form-item label="制单部门" v-bind="validateInfos.formCreateDept"> <a-input v-model:value="modelRef.formCreateDept" /> </a-form-item>
        </a-col>
        <a-col :span="12">
          <a-form-item label="申报人" v-bind="validateInfos.applyUser"> <a-input v-model:value="modelRef.applyUser" /> </a-form-item>
        </a-col>
        <a-col :span="12">
          <a-form-item label="制单人" v-bind="validateInfos.formCreateUser"> <a-input v-model:value="modelRef.formCreateUser" /> </a-form-item>
        </a-col>
        <a-col :span="12">
          <a-form-item label="申请单位" v-bind="validateInfos.applyCrop"> <a-input v-model:value="modelRef.applyCrop" /> </a-form-item>
        </a-col>
        <a-col :span="12">
          <a-form-item label="工程" v-bind="validateInfos.projectCode"> <a-input v-model:value="modelRef.projectCode" /> </a-form-item>
        </a-col>
        <a-col :span="12">
          <a-form-item label="申报班组" v-bind="validateInfos.applyGroup"> <a-input v-model:value="modelRef.applyGroup" /> </a-form-item>
        </a-col>
        <a-col :span="12">
          <a-form-item label="项目经理" v-bind="validateInfos.projectManager"> <a-input v-model:value="modelRef.projectManager" /> </a-form-item>
        </a-col>
        <a-col :span="24">
          <a-form-item label="备注" v-bind="validateInfos.remark"> <a-textarea v-model:value="modelRef.remark" :rows="3" /> </a-form-item>
        </a-col>
      </a-row>

      <a-form-item label="" v-bind="validateInfos.objects">
        <ObjectTableController v-model:value="modelRef.objects" />
      </a-form-item>
    </a-form>
  </a-modal>
</template>
