import { cloneDeep } from 'lodash-es'
import { Ref, toRaw } from 'vue'

export const useSearch = (paramsRef: Ref<Recordable>, listRef: Ref) => {
  const paramsValues = cloneDeep(toRaw(paramsRef.value))

  const reset = () => {
    paramsRef.value = { ...paramsValues }
    listRef.value?.search?.()
  }
  const search = () => {
    listRef.value?.search?.()
  }
  return { search, reset }
}
