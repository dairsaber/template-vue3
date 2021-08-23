// 通用的model类型声明
export type PaginationList<T = unknown> = {
  rows: T[]
  total: number
}
