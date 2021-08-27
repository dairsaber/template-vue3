<script lang="tsx" setup>
  import BaseList from '@/components/base-list/BaseList.vue'
  import BaseSearch, { useSearch } from '@/components/base-search'
  import { DictSelect, DictTag } from '@/components/dict'
  import { getUsers } from '@/apis/sys/users.api'
  import { ref } from 'vue'
  import type { UserModel } from '@/apis/sys/model/user.model'
  import { defineColumns, getOperation } from '@/utils/component/table.utils'

  const operationColumn = getOperation<UserModel>([
    {
      title: '审核',
      icon: 'all',
      action: (record) => {
        console.log(`record`, record)
      },
    },
    {
      title: '修改',
      icon: 'EditOutlined',
      type: 'WARN',
      action: (record) => {
        console.log(`record`, record)
      },
    },
    {
      title: '删除',
      icon: 'DeleteOutlined',
      type: 'DANGER',
      action: (record) => {
        console.log(`record`, record)
      },
    },

    {
      title: '详情',
      icon: 'all',
      type: 'INFO',
      action: (record) => {
        console.log(`record`, record)
      },
    },
  ])

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
    operationColumn,
  ])

  const paramsRef = ref({ searchValue: '', status: null })
  const listRef = ref()

  const rowKey = (record: UserModel) => record.userId

  // 搜索bar 配套hook
  const { reset, search } = useSearch(paramsRef, listRef)
</script>

<template>
  <div class="space-y-2">
    <a-card>
      <base-search :params="paramsRef" @search="search" @reset="reset">
        <a-space size="small" class="mb-2 mr-2">
          <a-input placeholder="请输入昵称搜索" v-model:value="paramsRef.searchValue" />
          <dict-select dict="sys_test" style="min-width: 100px" placeholder="请选择" v-model:value="paramsRef.status" />
        </a-space>
      </base-search>
    </a-card>

    <a-card>
      <a-space size="small">
        <dict-tag dict="sys_test" value="0" />
        <dict-tag dict="sys_test" value="1" />
        <dict-tag dict="sys_test" value="2" />
        <dict-tag dict="sys_test" value="3" />
      </a-space>
      <base-list class="mt-4" :params="paramsRef" :columns="columns" :action="getUsers" ref="listRef" :row-key="rowKey" />
    </a-card>
  </div>
</template>
