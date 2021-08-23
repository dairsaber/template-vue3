import { ColumnProps } from 'ant-design-vue/lib/table/interface'
import { Slot, VNode } from 'vue'

export type CustomRenderParams<T> = {
  text: unknown
  record: T
  index: number
}

// 增强了几个常用的 类型
export type EnhanceColumnProps<T extends Recordable = {}> = Omit<ColumnProps, 'customRender'> & {
  customRender?: (params: CustomRenderParams<T>) => string | Slot | Element | VNode
  dataIndex: keyof T
}

export const defineColumns = <T extends Recordable = {}>(columns: EnhanceColumnProps<T>[]): EnhanceColumnProps<T>[] => {
  return columns
}
