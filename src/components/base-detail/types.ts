import { VNode } from 'vue'

export type Cell =
  | {
      label: string | VNode | Fn<any, string | VNode>
      valueRender?: Fn<any, any>
      span?: number
    }
  | string
  | VNode
  | Fn<any, string | VNode>
