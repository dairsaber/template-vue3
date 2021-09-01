<script lang="tsx">
  import { isString, isFunction, isObject } from '@/utils/is'
  import { Descriptions } from 'ant-design-vue'
  import { computed, defineComponent, isVNode, PropType, VNode, h } from 'vue'
  import { Cell } from './types'

  export default defineComponent({
    name: 'BaseDetail',

    props: {
      dataSource: {
        type: Object as PropType<Nullable<Recordable>>,
      },
      cells: {
        type: [String, Object, Function] as PropType<Recordable<Cell>>,
        required: true,
      },
    },
    setup(props, { attrs }) {
      const valueRenderer = (value: any) => value // 渲染值的默认函数

      const descriptionItems = computed((): VNode[] => {
        const cells = props.cells as Recordable<Cell>
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

      return () => h(Descriptions, { bordered: true, ...attrs }, { default: () => descriptionItems.value })
    },
  })
</script>

<style lang="scss" scoped></style>
