<script lang="ts" setup>
  import { useUserStore } from '@/store/modules/user.store'
  import { useRouter } from 'vue-router'

  enum ActionKey {
    USER_CENTER,
    LOGOUT,
  }

  const router = useRouter()
  const userStore = useUserStore()

  const handleMenuClick = (key: ActionKey) => {
    if (key === ActionKey.USER_CENTER) {
      router.push('/user/center')
    } else if (key === ActionKey.LOGOUT) {
      userStore.logout()
    }
  }
</script>

<template>
  <a-dropdown>
    <a class="px-4 space-x-2 hover:bg-gray-200 hover:text-gray-50 ant-dropdown-link" @click.prevent>
      <a-avatar style="background-color: #87d068">
        <template #icon>
          <span v-if="userStore.user?.nickName">{{ userStore.user?.nickName[0] }}</span>
          <base-icon v-else icon="UserOutlined" />
        </template>
      </a-avatar>
      <span class="text-xs text-gray-600">{{ userStore.user?.nickName }}</span>
    </a>
    <template #overlay>
      <a-menu>
        <a-menu-item>
          <a @click.stop="handleMenuClick(ActionKey.USER_CENTER)"> <base-icon icon="UserOutlined" /> 个人中心</a>
        </a-menu-item>
        <a-menu-item>
          <a @click.stop="handleMenuClick(ActionKey.LOGOUT)"> <base-icon icon="LogoutOutlined" /> 退出</a>
        </a-menu-item>
      </a-menu>
    </template>
  </a-dropdown>
</template>

<style lang="scss" scoped></style>
