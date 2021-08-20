import { AppRouteRecordRaw, Component } from '@/route/types'

export interface RemoteRoute extends AppRouteRecordRaw {
  id: number
  parentId: number
  path: string
  component: string | Component
  name: string
  num: number
  hidden?: boolean
  children?: RemoteRoute[]
}
