import BaseIcon from '@/components/base-icon/BaseIcon.vue'
import BaseList from '@/components/base-list/BaseList.vue'
import BaseSearch from '@/components/base-search'
import { DictSelect, DictTag } from '@/components/dict'

import { App } from 'vue'

export const setupComponents = (app: App<Element>) => {
  // 注册全局组件
  app.component('BaseIcon', BaseIcon)
  app.component('BaseList', BaseList)
  app.component('BaseSearch', BaseSearch)
  app.component('DictSelect', DictSelect)
  app.component('DictTag', DictTag)
}
