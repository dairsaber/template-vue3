<template>
  <div class="flex items-center justify-center min-h-screen px-4 py-12 bg-gray-50 sm:px-6 lg:px-8">
    <div class="w-full max-w-sm p-3 px-8 space-y-8 bg-white rounded-md shadow-lg cursor-pointer hover:shadow-xl">
      <div>
        <SvgIcon icon="all" class="mx-auto" />
        <h2 class="mt-6 text-2xl font-bold text-center text-gray-900">登录账号</h2>
      </div>
      <a-form>
        <a-form-item v-bind="validateInfos.userName">
          <a-input v-model:value="loginFormModelRef.userName" autocomplete="username" placeholder="用户名">
            <template #prefix><UserOutlined style="color: rgba(0, 0, 0, 0.25)" /></template>
          </a-input>
        </a-form-item>
        <a-form-item v-bind="validateInfos.password">
          <a-input v-model:value="loginFormModelRef.password" type="password" autocomplete="current-password" placeholder="密码">
            <template #prefix><LockOutlined style="color: rgba(0, 0, 0, 0.25)" /></template>
          </a-input>
        </a-form-item>
        <a-form-item v-bind="validateInfos.code">
          <div class="flex space-x-2">
            <a-input v-model:value="loginFormModelRef.code" auto-complete="off" placeholder="验证码">
              <template #prefix> <SvgIcon icon="all" color="red" class="opacity-30" /></template>
            </a-input>
            <div class="float-right h-8 border-gray-700 w-22">
              <img :src="codeUrl" class="w-full h-full" @click="getSmsCode" />
            </div>
          </div>
        </a-form-item>
        <a-form-item>
          <div class="flex justify-between">
            <a-checkbox class="text-gray-400">记住我</a-checkbox>
            <a>忘记密码?</a>
          </div>
          <div class="flex mt-3 space-x-3">
            <a-button type="primary" @click.self="handleSubmit" :disabled="loginDisabled" block>登录</a-button>
          </div>
        </a-form-item>
      </a-form>
    </div>
  </div>
</template>

<script lang="ts" setup>
  import { computed, onMounted, reactive, ref, toRaw, watchEffect } from 'vue'
  import { UserOutlined, LockOutlined } from '@ant-design/icons-vue'
  import SvgIcon from '@/components/SvgIcon/SvgIcon.vue'
  import { useRouter, useRoute, LocationQuery } from 'vue-router'
  import { Form } from 'ant-design-vue'
  import { LoginParams } from '@/apis/sys/model/user.model'
  import { buildShortUUID } from '@/utils/uuid'
  import { getCaptchaImage } from '@/apis/sys/user.api'
  import { useUserStore } from '@/store/modules/user.store'
  import { message } from 'ant-design-vue'

  const useForm = Form.useForm

  const loginFormModelRef = reactive<LoginParams>({ userName: '', password: '', code: '', uuid: '' })
  loginFormModelRef.uuid = buildShortUUID()

  const loginFormRulesRef = reactive({
    userName: [{ required: true, message: '请输入用户名' }],
    password: [{ required: true, message: '请输入用户密码' }],
    code: [{ required: true, message: '请输入验证码' }],
  })
  const redirectRef = ref('')
  const queryRef = ref<LocationQuery>({})

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
    return loginFormModelRef.userName.trim() === '' || loginFormModelRef.password.trim() === '' || loginFormModelRef.code.trim() === ''
  })

  const { validate, validateInfos } = useForm(loginFormModelRef, loginFormRulesRef)
  const userStore = useUserStore()
  const router = useRouter()

  const handleSubmit = async () => {
    message.error('测试弹窗')

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

  const route = useRoute()

  watchEffect(() => {
    const query = route.query
    if (query) {
      redirectRef.value = query['redirect']?.toString() ?? ''
      queryRef.value = getOtherQuery(query)
    }
  })

  function getOtherQuery(query: LocationQuery) {
    return Object.keys(query).reduce((acc, cur) => {
      if (cur !== 'redirect') {
        acc[cur] = query[cur]
      }
      return acc
    }, {} as LocationQuery)
  }
</script>
