import BaseIcon from '@/components/base-icon/BaseIcon.vue'
import BaseList from '@/components/base-list/BaseList.vue'
import BaseSearch from '@/components/base-search'
import { DictSelect, DictTag } from '@/components/dict'
import GoTo from '@/components/go-to/GoTo.vue'

import { App } from 'vue'

export const setupComponents = (app: App<Element>) => {
  // 注册全局组件
  app.component(BaseIcon.name ?? 'BaseIcon', BaseIcon)
  app.component(BaseList.name ?? 'BaseList', BaseList)
  app.component(BaseSearch.name ?? 'BaseSearch', BaseSearch)
  app.component(DictSelect.name ?? 'DictSelect', DictSelect)
  app.component(DictTag.name ?? 'DictTag', DictTag)
  app.component(GoTo.name ?? 'GoTo', GoTo)
}
