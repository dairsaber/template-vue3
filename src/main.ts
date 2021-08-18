import { debugLog } from './utils/log'
import { createApp } from 'vue'
import App from './App.vue'
// 加入svg图标支持
import 'vite-plugin-svg-icons/register'

import '@/styles/index.scss'

import router, { setupRouter } from './route'

debugLog(router)
const app = createApp(App)
setupRouter(app)

app.mount('#app')
