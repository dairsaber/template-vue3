import { RouteRecordRaw, RouteMeta } from 'vue-router'
import { defineComponent } from 'vue'

export type Component<T extends unknown = unknown> = ReturnType<typeof defineComponent> | (() => Promise<typeof import('*.vue')>) | (() => Promise<T>)

export interface AppRouteRecordRaw extends Omit<RouteRecordRaw, 'meta' | 'children' | 'component'> {
  name?: string
  fullPath?: string
  meta?: AppRouteMeta
  roles?: string[]
  hidden?: boolean
  component?: Component | string
  components?: Component
  children?: AppRouteRecordRaw[]
}

export interface AppRouteMeta extends RouteMeta {
  title: string
  fullPath?: string
  affix?: boolean
  icon?: string
  noCache?: boolean
  breadcrumb?: boolean // 默认true
  isLayout?: boolean // 默认 false
}
