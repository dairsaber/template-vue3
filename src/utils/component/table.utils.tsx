import { ColumnProps } from 'ant-design-vue/lib/table/interface'
import { Slot, toRaw, VNode, withModifiers } from 'vue'
import { Button, Dropdown, Menu, MenuItem } from 'ant-design-vue'
import BaseIcon from '@/components/base-icon/BaseIcon.vue'
import { colorTypes, ColorType } from '@/settings/color.conf'

export type CustomRenderParams<T> = {
  text: unknown
  record: T
  index: number
}

export type Operation<T extends Recordable> = {
  icon: string
  title: string | VNode
  action: (record: T) => Promise<void> | void
  type?: ColorType
}

// 增强了几个常用的 类型
export type EnhanceColumnProps<T extends Recordable> = Omit<ColumnProps, 'customRender'> & {
  customRender?: (params: CustomRenderParams<T>) => string | Slot | Element | VNode
  dataIndex: keyof T
}

export const defineColumns = <T extends Recordable>(
  columns: EnhanceColumnProps<T>[]
): EnhanceColumnProps<T>[] => {
  return columns
}

/**
 * 返回 columns operation操作项
 * @param options 操作配置
 * @param splitNumber 分割位置 从第二个操作分割还是什么的
 * @returns {CustomRenderParams}
 */
export const getOperation = <T extends Recordable>(
  options: Operation<T>[],
  splitNumber = 2
): EnhanceColumnProps<T> => {
  const flatParts = options.slice(0, splitNumber)
  const mixParts = options.slice(splitNumber)
  if (flatParts.length === 0) {
    throw new Error('操作配置需要传 options 不能为空')
  }
  const getType = (typeKey?: ColorType) => {
    const key = (typeKey ?? 'DEFAULT').toLocaleUpperCase() as ColorType
    return colorTypes[key]
  }

  const flatPartVNodes: (record: T) => VNode[] = (record) =>
    flatParts.map((option) => (
      <Button
        type="dashed"
        onClick={withModifiers(() => {
          option.action(record)
        }, ['self'])}
        size="small"
        style={{ color: getType(option.type), whiteSpace: 'nowrap' }}
        v-slots={{ icon: () => <BaseIcon icon={option.icon} /> }}
      >
        {option.title}
      </Button>
    ))

  let mixPartVNode: (record: T) => VNode | null = () => null
  if (mixParts.length > 0) {
    const items: () => VNode[] = () =>
      mixParts.map((option, index) => {
        return (
          <MenuItem key={index} style={{ color: getType(option.type) }}>
            <BaseIcon icon={option.icon} /> {option.title}
          </MenuItem>
        )
      })

    mixPartVNode = (record: T): VNode => (
      <Dropdown
        v-slots={{
          overlay: () => (
            <Menu
              onClick={({ key }) => {
                console.log(`key`, key)
                mixParts[key]?.action(record)
              }}
            >
              {items()}
            </Menu>
          ),
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
      const recordRaw = toRaw(record)
      return (
        <div class="space-x-2 whitespace-nowrap">
          {flatPartVNodes(recordRaw)}
          {mixPartVNode(recordRaw)}
        </div>
      )
    },
  }
}
