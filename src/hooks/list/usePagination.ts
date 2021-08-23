import { QueryParams } from '@/@types/request'
import { Result } from '#/axios'
import { PaginationList } from '@/@types/model/model'
import { TableState } from 'ant-design-vue/lib/table/interface'

import { computed, reactive, toRaw } from 'vue'
import * as config from '@/settings/pagination.conf'
import { useRequest } from '../request/useRequest'

export type QueryAction = (params: QueryParams) => Promise<Result>

export type ListProps = {
  params?: QueryParams
  action: QueryAction
}

type Pagination = TableState['pagination']

export const usePagination = (props: ListProps) => {
  const paginationModel = reactive({
    current: 1,
    pageSize: config.defaultPagesize,
  })

  const searchQuery = computed(() => {
    return {
      ...props.params,
      pageNum: paginationModel.current,
      pageSize: paginationModel.pageSize,
    }
  })

  const { search, loading, result } = useRequest<PaginationList>(props.action, toRaw(searchQuery.value), { rows: [], total: 0 }, (result: Result) => {
    return result.data as PaginationList
  })

  // 分页事件
  const handlePaginationChange = (page: number, pageSize: number) => {
    paginationModel.current = page
    paginationModel.pageSize = pageSize
    handleSearch()
  }

  // 分页参数
  const pagination = computed((): Pagination => {
    return {
      ...toRaw(paginationModel),
      total: result.value.total,
      pageSizeOptions: config.defaultPageSizeOptions,
      showSizeChanger: true,
      onChange: handlePaginationChange,
      onShowSizeChange: handlePaginationChange,
    }
  })

  // 搜索
  const handleSearch = async () => {
    search(toRaw(searchQuery.value))
  }

  const dataSource = computed(() => result.value.rows)

  return { pagination, dataSource, loading, handleSearch }
}
