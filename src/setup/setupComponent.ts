import BaseIcon from '@/components/base-icon/BaseIcon.vue'
import { App } from 'vue'

export const setupComponents = (app: App<Element>) => {
  // 注册全局组件
  app.component('BaseIcon', BaseIcon)
}
