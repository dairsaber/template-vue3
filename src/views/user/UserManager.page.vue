<script lang="tsx" setup>
  import BaseList from '@/components/base-list/BaseList.vue'
  import BaseSearch, { useSearch } from '@/components/base-search'

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

  const paramsRef = ref({ searchValue: '' })
  const listRef = ref()

  const rowKey = (record: UserModel) => record.userId

  // 搜索bar 配套hook
  const { reset, search } = useSearch(paramsRef, listRef)
</script>

<template>
  <div class="space-y-2">
    <a-card>
      <BaseSearch :params="paramsRef" @search="search" @reset="reset">
        <a-input placeholder="请输入昵称搜索" v-model:value="paramsRef.searchValue" />
      </BaseSearch>
    </a-card>

    <a-card>
      <base-list class="mt-4" :params="paramsRef" :columns="columns" :action="getUsers" ref="listRef" :row-key="rowKey" />
    </a-card>
  </div>
</template>
