<script lang="ts" setup>
  import { computed, onMounted, reactive, ref, toRaw, watchEffect } from 'vue'
  import { useRouter, useRoute, LocationQuery } from 'vue-router'
  import { Form } from 'ant-design-vue'
  import { LoginParams } from '@/apis/sys/model/user.model'
  import { getCaptchaImage } from '@/apis/sys/user.api'
  import { useUserStore } from '@/store/modules/user.store'

  const loginFormModelRef = reactive<LoginParams>({
    username: 'admin',
    password: 'admin123',
    code: '',
    uuid: '',
  })
  const loginFormRulesRef = reactive({
    username: [{ required: true, message: '请输入用户名' }],
    password: [{ required: true, message: '请输入用户密码' }],
    code: [{ required: true, message: '请输入验证码' }],
  })

  const codeUrl = ref('')
  // 禁止登录状态规则判断
  const loginDisabled = computed(() => {
    return (
      loginFormModelRef.username.trim() === '' ||
      loginFormModelRef.password.trim() === '' ||
      loginFormModelRef.code.trim() === ''
    )
  })

  // 获得验证码
  const getSmsCode = async () => {
    const result = await getCaptchaImage()
    codeUrl.value = 'data:image/gif;base64,' + result.data?.img
    loginFormModelRef.uuid = result.data?.uuid
  }
  onMounted(() => {
    getSmsCode()
  })

  const showPassword = ref(false)

  const handleTogglePasswordStatus = () => {
    showPassword.value = !showPassword.value
  }

  // 页面根据url初始参数设置
  const redirectRef = ref('')
  const queryRef = ref<LocationQuery>({})
  const route = useRoute()
  watchEffect(() => {
    const query = route.query
    if (query) {
      redirectRef.value = query['redirect']?.toString() ?? ''
      queryRef.value = getOtherQuery(query)
    }
  })

  // 登录
  const useForm = Form.useForm
  const { validate, validateInfos } = useForm(loginFormModelRef, loginFormRulesRef)
  const userStore = useUserStore()
  const router = useRouter()

  const handleSubmit = async () => {
    try {
      await validate()
      const result = toRaw(loginFormModelRef) as LoginParams

      await userStore.login(result)
      // TODO 现在暂时跳转到首页 以后支持根据不同角色首页不同
      router.push({
        path: redirectRef.value || '/',
        query: queryRef.value,
      })
    } catch (error) {
      console.error(`error`, error)
    }
  }

  function getOtherQuery(query: LocationQuery) {
    return Object.keys(query).reduce((acc, cur) => {
      if (cur !== 'redirect') {
        acc[cur] = query[cur]
      }
      return acc
    }, {} as LocationQuery)
  }
</script>
<template>
  <div
    class="flex items-center justify-center min-h-screen px-4 py-12 bg-gray-50 sm:px-6 lg:px-8"
    style="background-image: url(/img/login-bgc.jpg)"
  >
    <div class="w-full max-w-sm p-3 px-8 space-y-8 bg-white bg-opacity-75 shadow-lg rounded-xl">
      <div
        class="flex items-center justify-center w-20 h-20 mx-auto -mt-10 text-5xl transform -translate-y-4 bg-white rounded-full "
      >
        <base-icon icon="all" class="mx-auto" />
      </div>
      <a-form>
        <a-form-item v-bind="validateInfos.username">
          <a-input
            v-model:value="loginFormModelRef.username"
            autocomplete="username"
            size="large"
            placeholder="用户名"
          >
            <template #prefix
            ><base-icon icon="UserOutlined" style="color: rgba(0, 0, 0, 0.25)"
            /></template>
          </a-input>
        </a-form-item>
        <a-form-item v-bind="validateInfos.password">
          <a-input
            v-model:value="loginFormModelRef.password"
            :type="showPassword ? 'text' : 'password'"
            autocomplete="current-password"
            placeholder="密码"
            size="large"
          >
            <template #prefix
            ><base-icon icon="LockOutlined" style="color: rgba(0, 0, 0, 0.25)"
            /></template>

            <template #suffix
            ><base-icon
              @click="handleTogglePasswordStatus"
              :icon="showPassword ? 'EyeOutlined' : 'EyeInvisibleOutlined'"
              style="color: rgba(0, 0, 0, 0.25)"
            /></template>
          </a-input>
        </a-form-item>
        <a-form-item v-bind="validateInfos.code">
          <div class="flex space-x-2">
            <a-input
              v-model:value="loginFormModelRef.code"
              auto-complete="off"
              placeholder="验证码"
              size="large"
            >
              <template #prefix> <base-icon icon="all" class="opacity-30" /></template>
            </a-input>
            <div class="float-right w-40 h-10 border-gray-700">
              <img :src="codeUrl" class="w-full h-full" @click="getSmsCode">
            </div>
          </div>
        </a-form-item>
        <a-form-item>
          <div class="flex justify-between">
            <a-checkbox class="text-gray-400">记住我</a-checkbox>
            <a>忘记密码?</a>
          </div>
          <div class="flex mt-3 space-x-3">
            <a-button
              type="primary"
              @click="handleSubmit"
              :disabled="loginDisabled"
              block
              size="large"
            >
              <template #icon>
                <base-icon icon="UsergroupDeleteOutlined" />
              </template>
              登录</a-button
            >
          </div>
        </a-form-item>
      </a-form>
    </div>
  </div>
</template>
