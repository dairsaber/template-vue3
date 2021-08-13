import { debugLog } from './utils/log'
import { createApp } from 'vue'
import App from './App.vue'

import '@/styles/index.scss'

import router, { setupRouter } from './route'

debugLog(router)
const app = createApp(App)
setupRouter(app)

app.mount('#app')
