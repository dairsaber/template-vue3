<script lang="tsx">
  import { isString, isFunction, isObject } from '@/utils/is'

  import { computed, defineComponent, isVNode, VNode } from 'vue'
  export type Cell =
    | {
        label: string | VNode | Fn<any, string | VNode>
        valueRender?: Fn<any, any>
        span?: number
      }
    | string
    | VNode
    | Fn<any, string | VNode>
  type ComponentProps = {
    dataSource?: Recordable
    cells: Recordable<Cell>
  }

  export default defineComponent({
    name: 'BaseDetail',
    setup(props: ComponentProps, { attrs }) {
      const valueRenderer = (value: any) => value // 渲染值的默认函数

      const descriptionItems = computed((): VNode[] => {
        const cells = props.cells
        const items: VNode[] = []
        Object.keys(cells).forEach((cellKey) => {
          const cellItem = cells[cellKey]
          const currentValue = props.dataSource?.[cellKey] ?? null

          let [span, valueRender, label]: [number, Fn<any, any>, string | VNode] = [1, valueRenderer, '']

          if (isString(cellItem)) {
            label = cellItem
          } else if (isVNode(cellItem)) {
            label = cellItem
          } else if (isFunction(cellItem)) {
            label = cellItem(currentValue)
            // 解析当cell是Object配置的情况 此情况较为复杂
          } else if (isObject(cellItem)) {
            const { span: currentSpan = span, valueRender: currentValueRender = valueRender, label: currentLabel = label } = cellItem

            if (isString(currentLabel)) {
              label = currentLabel
            } else if (isVNode(currentLabel)) {
              label = currentLabel
            } else if (isFunction(currentLabel)) {
              label = currentLabel(currentValue)
            }
            span = currentSpan
            valueRender = currentValueRender
          }

          items.push(
            <a-descriptions-item label={label} span={span}>
              {valueRender(currentValue)}
            </a-descriptions-item>
          )
        })

        return items
      })

      return () => (
        <a-descriptions v-bind={attrs} bordered>
          {descriptionItems.value}
        </a-descriptions>
      )
    },
  })
</script>

<style lang="scss" scoped></style>
