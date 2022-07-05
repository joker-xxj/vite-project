import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './styles/index.scss'
import I18n from '@/language/index'

const app = createApp(App)
app.use(router).use(store).use(I18n).mount('#app')
