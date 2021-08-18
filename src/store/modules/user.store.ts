import { removeToken } from '@/utils/cookies'
import { UserModel } from '@/apis/sys/model/user.model'
import { setToken } from '@/utils/cookies'
import { LoginParams } from '@/apis/sys/model/user.model'
import { getUserInfo, loginApi } from '@/apis/sys/user.api'
import { defineStore } from 'pinia'
import { message } from 'ant-design-vue'
import { resetRouter } from '@/route'

export type UserState = {
  token?: string
  name: string
  avatar?: string
  roles: string[]
  permissions: string[]
  user: UserModel | null
  uuid: string
}

export const useUserStore = defineStore({
  id: 'user',
  state: (): UserState => ({
    token: '',
    name: '',
    avatar: '',
    roles: [],
    permissions: [],
    user: null,
    uuid: '',
  }),

  actions: {
    async login(params: LoginParams) {
      const res = await loginApi(params)
      const token = res.data.token
      if (token) {
        setToken(token)
        this.token = token
        this.uuid = params.uuid
      } else {
        message.error('登录失败')
      }
    },
    async getUserInfo() {
      const token = this.token
      if (!token) {
        throw Error('token 失效')
      }
      const { data: userInfo } = await getUserInfo()
      const { roles, user } = userInfo

      this.roles = roles
      this.user = user
      this.name = user.userName
      this.permissions = user.permissions
      this.avatar = user.avatar
    },
    resetToken() {
      this.token = ''
      this.roles = []
    },
    logout() {
      removeToken()
      this.resetToken()
      resetRouter()
    },
  },
})