import { createApp } from 'vue'
import App from './App.vue'
import router from './router/index'
import pinia from './store/index'
import https from '@/service'
import './styles/index.scss'
import I18n from '@/language/index'

const app = createApp(App)

app.config.globalProperties.$http = https
app.use(router).use(pinia).use(I18n).mount('#app')
