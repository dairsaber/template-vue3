<template>
  <div class="flex items-center justify-center min-h-screen px-4 py-12 bg-gray-50 sm:px-6 lg:px-8">
    <div class="w-full max-w-xs p-3 space-y-8 bg-white rounded-md shadow-lg cursor-pointer hover:shadow-xl">
      <div>
        <img class="w-auto h-12 mx-auto" src="https://tailwindui.com/img/logos/workflow-mark-indigo-600.svg" alt="Workflow" />
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
      </a-form>
      <div class="flex space-x-3">
        <a-button type="primary" @click.self="handleSubmit" :disabled="loginDisabled" block>登录</a-button>
        <a-button danger @click.self="resetFields" block>重置</a-button>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
  export interface LoginFormState {
    username: string
    password: string
  }

  import { computed, reactive, toRaw } from 'vue'
  import { UserOutlined, LockOutlined } from '@ant-design/icons-vue'
  import { debugLog } from '@/utils/log'
  import { Form } from 'ant-design-vue'
  const useForm = Form.useForm

  const loginFormModelRef = reactive<LoginFormState>({ username: '', password: '' })
  const loginFormRulesRef = reactive({
    username: [{ required: true, message: '请输入用户名' }],
    password: [{ required: true, message: '请输入用户密码' }],
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
