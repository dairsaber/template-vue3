import { createApp } from 'vue'
import App from './App.vue'
import '@/styles/index.scss'

console.log(`env`, import.meta.env)
createApp(App).mount('#app')
