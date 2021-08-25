<script lang="tsx">
  import { antIconNames, Icons } from '@/setup/antd'
  import { computed, createVNode, defineComponent } from 'vue'

  export default defineComponent({
    props: { icon: { type: String, required: true }, className: String },
    setup(props) {
      const isAntIcon = computed(() => antIconNames.includes(props.icon))

      const AntIcon = computed(() => {
        if (isAntIcon.value) {
          return createVNode(Icons[props.icon], { style: { verticalAlign: '1px' } })
        }
        return null
      })

      const iconName = computed(() => `#svg-${props.icon}`)
      const svgClass = computed(() => (props.className ? `svg-icon ${props.className}` : 'svg-icon'))

      return () => {
        if (isAntIcon.value) {
          return AntIcon.value
        } else {
          return (
            <svg class={svgClass.value} aria-hidden="true">
              <use xlinkHref={iconName.value} fill="currentColor" />
            </svg>
          )
        }
      }
    },
  })
</script>

<style lang="scss" scoped>
  .svg-icon {
    width: 1em;
    height: 1em;
    fill: currentColor;
    vertical-align: middle;
  }
</style>
