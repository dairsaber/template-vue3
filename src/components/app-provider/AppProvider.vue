<script lang="ts">
  import { defineComponent, useSlots } from 'vue'

  export default defineComponent({
    setup() {
      const slots = useSlots()
      return () => slots.default?.()
    },
  })
</script>
