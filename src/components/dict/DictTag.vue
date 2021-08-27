<script lang="ts" setup>
  import { DictType } from '@/apis/sys/model/dict.model'
  import { getDictMap } from '@/services/dict.service'
  import { computed, onMounted, ref } from 'vue'
  import { Tag } from 'ant-design-vue'
  import { tagColorTypes } from '@/settings/color.conf'

  type DictTagProps = {
    dict: string
    value?: string
    noneLabel?: string
  }
  const props = defineProps<DictTagProps>()

  const dictMapRef = ref<Recordable<DictType>>({})
  const dictItemRef = computed(() => {
    let result = null
    if (props.value) {
      result = dictMapRef.value[props.value] ?? null
    }
    return result
  })
  onMounted(async () => {
    // 获取字典
    dictMapRef.value = await getDictMap(props.dict)
  })
</script>

<template>
  <Tag v-if="dictItemRef" :color="tagColorTypes[dictItemRef?.showType ?? 'DEFAULT']">{{ dictItemRef.dictLabel }}</Tag>
  <Tag v-else :color="tagColorTypes.DANGER">{{ noneLabel ?? '暂无' }}</Tag>
</template>
