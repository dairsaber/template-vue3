<script lang="ts" setup>
  import { DictType } from '@/apis/sys/model/dict.model'
  import { getDict } from '@/services/dict.service'
  import { onMounted, ref, useAttrs } from 'vue'
  import { colorTypes } from '@/settings/color.conf'
  type DictSelectProps = {
    dict: string
  }
  const props = defineProps<DictSelectProps>()
  const dictRef = ref<DictType[]>([])
  const loadingRef = ref(true)
  onMounted(async () => {
    // 获取字典
    dictRef.value = await getDict(props.dict)
    loadingRef.value = false
  })
  const attrs = useAttrs()
</script>

<template>
  <a-select v-bind="attrs" :loading="loadingRef">
    <a-select-option v-for="item in dictRef" :key="item.dictValue" :value="item.dictValue">
      <span :style="{ color: colorTypes[item.showType] }">{{ item.dictLabel }}</span>
    </a-select-option>
  </a-select>
</template>
