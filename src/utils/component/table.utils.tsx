import { ColumnProps } from 'ant-design-vue/lib/table/interface'
import { Slot, VNode, withModifiers } from 'vue'
import { Button, Dropdown, Menu, MenuItem } from 'ant-design-vue'
import BaseIcon from '@/components/base-icon/BaseIcon.vue'
import { colorTypes } from '@/settings/color.conf'

type OperationTypesKey = keyof typeof colorTypes

export type CustomRenderParams<T> = {
  text: unknown
  record: T
  index: number
}

export type Operation<T extends Recordable> = {
  icon: string
  title: string | VNode
  action: (record: T) => Promise<void> | void
  type?: OperationTypesKey
}

// 增强了几个常用的 类型
export type EnhanceColumnProps<T extends Recordable> = Omit<ColumnProps, 'customRender'> & {
  customRender?: (params: CustomRenderParams<T>) => string | Slot | Element | VNode
  dataIndex: keyof T
}

export const defineColumns = <T extends Recordable>(columns: EnhanceColumnProps<T>[]): EnhanceColumnProps<T>[] => {
  return columns
}

/**
 * 返回 columns operation操作项
 * @param options 操作配置
 * @param splitNumber 分割位置 从第二个操作分割还是什么的
 * @returns {CustomRenderParams}
 */
export const getOperation = <T extends Recordable>(options: Operation<T>[], splitNumber = 2): EnhanceColumnProps<T> => {
  const flatParts = options.slice(0, splitNumber)
  const mixParts = options.slice(splitNumber)
  if (flatParts.length === 0) {
    throw new Error('操作配置需要传 options 不能为空')
  }
  const getType = (typeKey?: OperationTypesKey) => {
    const key = (typeKey ?? 'DEFAULT').toLocaleUpperCase() as OperationTypesKey
    return colorTypes[key]
  }

  const flatPartVNodes: (record: T) => VNode[] = (record) =>
    flatParts.map((option) => (
      <Button
        onClick={withModifiers(() => {
          option.action(record)
        }, ['self'])}
        size="small"
        style={{ backgroundColor: getType(option.type), color: '#fff', whiteSpace: 'nowrap' }}
        v-slots={{ icon: () => <BaseIcon icon={option.icon} /> }}
      >
        {option.title}
      </Button>
    ))

  let mixPartVNode: (record: T) => VNode | null = () => null
  if (mixParts.length > 0) {
    const items: (record: T) => VNode[] = (record) =>
      mixParts.map((option) => {
        return (
          <MenuItem
            onClick={withModifiers(() => {
              option.action(record)
            }, ['self'])}
            style={{ color: getType(option.type) }}
          >
            <BaseIcon icon={option.icon} /> {option.title}
          </MenuItem>
        )
      })

    mixPartVNode = (record: T): VNode => (
      <Dropdown
        v-slots={{
          overlay: () => <Menu>{items(record)}</Menu>,
        }}
      >
        <a onClick={withModifiers(() => {}, ['prevent'])}>
          更多
          <BaseIcon icon="DownOutlined" />
        </a>
      </Dropdown>
    )
  }

  return {
    title: '操作',
    dataIndex: '$operation',
    key: '$operation',
    align: 'center',
    width: 0,
    customRender: ({ record }) => {
      return (
        <div class="space-x-2 whitespace-nowrap">
          {flatPartVNodes(record)}
          {mixPartVNode(record)}
        </div>
      )
    },
  }
}
