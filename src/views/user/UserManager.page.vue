<script lang="tsx" setup>
  import BaseList from '@/components/base-list/BaseList.vue'
  import { getUsers } from '@/apis/sys/users.api'
  import { ref } from 'vue'
  import type { UserModel } from '@/apis/sys/model/user.model'
  import { defineColumns } from '@/utils/component/table.utils'

  const columns = defineColumns<UserModel>([
    {
      dataIndex: 'nickName',
      title: '昵称',
      key: 'nickName',
    },
    {
      dataIndex: 'phonenumber',
      title: '联系方式',
      key: 'phonenumber',
    },
    {
      dataIndex: 'email',
      title: '邮箱',
      key: 'email',
      customRender: ({ record }) => {
        return <a-tag>{record.email}</a-tag>
      },
    },
  ])
  const params = ref({ searchValue: '' })
  const listRef = ref()
  const rowKey = (record: UserModel) => record.userId

  // 搜索
  const handleSearch = () => {
    listRef.value.search()
  }
</script>

<template>
  <div class="space-y-2">
    <a-card>
      <a-space :size="8">
        <a-input placeholder="请输入昵称搜索" v-model:value="params.searchValue" />
        <a-button @click="handleSearch">
          <template #icon>
            <SearchOutlined />
          </template>
          搜索
        </a-button>
      </a-space>
    </a-card>
    <a-card>
      <base-list class="mt-4" :params="params" :columns="columns" :action="getUsers" ref="listRef" :row-key="rowKey" />
    </a-card>
  </div>
</template>
