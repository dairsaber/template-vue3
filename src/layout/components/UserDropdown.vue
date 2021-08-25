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
    <a class="ant-dropdown-link" @click.prevent>
      <a-avatar style="background-color: #87d068">
        <template #icon>
          <base-icon icon="UserOutlined" />
        </template>
      </a-avatar>
    </a>
    <template #overlay>
      <a-menu>
        <a-menu-item>
          <a @click.self="handleMenuClick(ActionKey.USER_CENTER)"> <base-icon icon="UserOutlined" /> 个人中心</a>
        </a-menu-item>
        <a-menu-item>
          <a @click.self="handleMenuClick(ActionKey.LOGOUT)"><base-icon icon="LogoutOutlined" /> 退出</a>
        </a-menu-item>
      </a-menu>
    </template>
  </a-dropdown>
</template>

<style lang="scss" scoped></style>
