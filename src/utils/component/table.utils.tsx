import { ColumnProps } from 'ant-design-vue/lib/table/interface'
import { Slot, toRaw, VNode, withModifiers } from 'vue'
import { Button, Dropdown, Menu, MenuItem, TypographyParagraph } from 'ant-design-vue'
import BaseIcon from '@/components/base-icon/BaseIcon.vue'
import { colorTypes, ColorType } from '@/settings/color.conf'
import { RouteLocationRaw } from 'vue-router'
import GoTo from '@/components/go-to/GoTo.vue'
import { isNumber, isObject } from '@/utils/is'

export type CustomRenderParams<T extends Recordable = Recordable> = {
  text: string
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

// 定义列表的列
export const defineColumns = <T extends Recordable>(columns: EnhanceColumnProps<T>[]): EnhanceColumnProps<T>[] => {
  return columns
}

export function getOperation<T extends Recordable>(options: Operation<T>[], config?: Partial<EnhanceColumnProps<T>>): EnhanceColumnProps<T>
export function getOperation<T extends Recordable>(options: Operation<T>[], splitNumber?: number): EnhanceColumnProps<T>
export function getOperation<T extends Recordable>(options: Operation<T>[], splitNumber: number, config?: Partial<EnhanceColumnProps<T>>): EnhanceColumnProps<T>
/**
 * 返回 columns operation操作项
 * @param options 操作配置
 * @param splitNumber 分割位置 从第二个操作分割还是什么的
 * @returns {CustomRenderParams}
 */
export function getOperation<T extends Recordable>(options: Operation<T>[], arg2?: Partial<EnhanceColumnProps<T>> | number, config?: Partial<EnhanceColumnProps<T>>): EnhanceColumnProps<T> {
  let splitNumber = 2
  let currentConfig = {} as Partial<EnhanceColumnProps<T>>

  if (isNumber(arg2)) {
    splitNumber = arg2
  } else if (isObject(arg2)) {
    currentConfig = arg2
  } else if (isObject(config)) {
    currentConfig = config
  }

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
        }, ['stop'])}
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
    ...currentConfig,
  }
}

export const renderGoTo = (text: string | VNode, to: RouteLocationRaw) => (
  <GoTo class="whitespace-nowrap" to={to}>
    {text}
  </GoTo>
)

/**
 * 渲染长文本
 * @param rows 最大行数
 * @returns
 */
export const renderLongText =
  (rows: number) =>
  ({ text }: CustomRenderParams): VNode | string => {
    return text ? <TypographyParagraph ellipsis={{ rows, expandable: true }} content={text} /> : ''
  }

/**
 * 渲染可复制的文本
 * @param param0
 * @returns
 */
export const renderCopyText = ({ text }: CustomRenderParams): VNode | string => {
  return text ? <TypographyParagraph copyable>{text}</TypographyParagraph> : ''
}
