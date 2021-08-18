<template>
  <div class="flex items-center justify-center min-h-screen px-4 py-12 bg-gray-50 sm:px-6 lg:px-8">
    <div class="w-full max-w-xs p-3 space-y-8 bg-white rounded-md shadow-lg cursor-pointer hover:shadow-xl">
      <div>
        <SvgIcon icon="all" class="mx-auto" />
        <h2 class="mt-6 text-2xl font-bold text-center text-gray-900">登录账号</h2>
      </div>
      <a-form :model="loginFormModelRef">
        <a-form-item>
          <a-input v-model:value="loginFormModelRef.username" placeholder="Username">
            <template #prefix><UserOutlined style="color: rgba(0, 0, 0, 0.25)" /></template>
          </a-input>
        </a-form-item>
        <a-form-item>
          <a-input v-model:value="loginFormModelRef.password" type="password" placeholder="Password">
            <template #prefix><LockOutlined style="color: rgba(0, 0, 0, 0.25)" /></template>
          </a-input>
        </a-form-item>
        <a-form-item>
          <div class="flex space-x-2">
            <a-input v-model:value="loginFormModelRef.code" auto-complete="off" placeholder="验证码">
              <template #prefix><LockOutlined style="color: rgba(0, 0, 0, 0.25)" /></template>
            </a-input>
            <div class="float-right h-8 border-gray-700 w-22">
              <img :src="codeUrl" class="w-full h-full" @click="getSmsCode" />
            </div>
          </div>
        </a-form-item>
      </a-form>
      <div class="flex space-x-3">
        <a-button type="primary" @click.self="handleSubmit" :disabled="loginDisabled" block>登录</a-button>
        <a-button danger @click.self="resetFields" block>重置</a-button>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
  import { computed, onMounted, reactive, ref, toRaw } from 'vue'
  import { UserOutlined, LockOutlined } from '@ant-design/icons-vue'
  import SvgIcon from '@/components/SvgIcon/SvgIcon.vue'
  import { debugLog } from '@/utils/log'
  import { Form } from 'ant-design-vue'
  import { LoginParams } from '@/apis/sys/model/user.model'
  import { buildShortUUID } from '@/utils/uuid'
  import { getCaptchaImage } from '@/apis/sys/user.api'
  const useForm = Form.useForm

  const loginFormModelRef = reactive<LoginParams>({ username: '', password: '', code: '', uuid: '' })
  loginFormModelRef.uuid = buildShortUUID()

  const loginFormRulesRef = reactive({
    username: [{ required: true, message: '请输入用户名' }],
    password: [{ required: true, message: '请输入用户密码' }],
  })

  const codeUrl = ref('')

  const getSmsCode = async () => {
    const result = await getCaptchaImage()
    codeUrl.value = 'data:image/gif;base64,' + result?.img
  }
  onMounted(() => {
    getSmsCode()
  })

  // 禁止登录状态规则判断
  const loginDisabled = computed(() => {
    return loginFormModelRef.username.trim() === '' || loginFormModelRef.password.trim() === ''
  })

  const { validate, resetFields } = useForm(loginFormModelRef, loginFormRulesRef)

  const handleSubmit = async () => {
    try {
      await validate()
      const result = toRaw(loginFormModelRef)
      // TODO  调取相应的登录功能
      debugLog(`result`, result)
    } catch (error) {
      console.error(`error`, error)
    }
  }
</script>
