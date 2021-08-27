<script lang="ts" setup>
  // 这边完成的功能就是 根据传进来的 params 查询
  // 分页
  import { QueryAction, useList } from '@/hooks/list/useList'
  // import { useAttrs } from 'vue'
  import { TableState, TableProps } from 'ant-design-vue/lib/table/interface'

  // 这边是 antd的一个bug 类型声明中 columns 类型声明错误 所以在此重新声明一下
  // FIXME vue3 现在对复杂的类型推断 为props类型是不支持的 等待以后的解决 https://github.com/vuejs/vue-next/issues/4294
  // export type ListProps & Omit<TableProps, 'dataSource' | 'pagination' | 'columns'> &  { columns: TableState['columns']}

  export interface BaseListProps
    extends Omit<TableProps, 'dataSource' | 'pagination' | 'loading' | 'columns'> {
    columns: TableState['columns']
    params?: QueryParams
    action: QueryAction
  }

  // export type BaseListProps = {
  //   params?: QueryParams
  //   action: QueryAction
  // }

  const props = defineProps<BaseListProps>()

  const { dataSource, pagination, loading, handleSearch } = useList(props)

  defineExpose({ search: handleSearch })
</script>

<template>
  <a-table v-bind="props" :pagination="pagination" :loading="loading" :dataSource="dataSource" />
</template>
