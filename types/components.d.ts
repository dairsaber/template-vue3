declare module 'vue' {
  export interface GlobalComponents {
    RouterLink: typeof import('vue-router')['RouterLink']
    RouterView: typeof import('vue-router')['RouterView']
    AButton: typeof import('ant-design-vue/es')['Button']
    AForm: typeof import('ant-design-vue/es')['Form']
    AFormItem: typeof import('ant-design-vue/es')['FormItem']
    AInput: typeof import('ant-design-vue/es')['Input']
  }
}

export {}
