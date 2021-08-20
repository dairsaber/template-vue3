import * as AntIcons from '@ant-design/icons-vue'
import type { App, Component } from 'vue'

export const antIconNames = Object.keys(AntIcons)
export const Icons = AntIcons as Recordable<Component>

export const setupAnt = (app: App<Element>) => {
  // 注册 antd 的所有图标去全局
  antIconNames.forEach((key) => {
    app.component(key, (AntIcons as Recordable<Component>)[key])
  })
}
