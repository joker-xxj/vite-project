import { GlobalState } from './interface'
import piniaPersistConfig from '@/config/piniaPersist'
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'

// defineStore 调用后返回一个函数，调用该函数获得 Store 实体
export const GlobalStore = defineStore({
  // id: 必须的，在所有 Store 中唯一
  id: 'GlobalState',
  // state: 返回对象的函数
  state: (): GlobalState => ({
    token: '',
    loading: false,
    language: 'zh-cn'
  }),
  getters: {},
  actions: {
    // setToken
    setToken (token: string) {
      this.token = token
    },
    // setUserInfo
    setLoading (loading: boolean) {
      this.loading = loading
    },
    // updateLanguage
    updateLanguage (language: string) {
      this.language = language
    }
  },
  persist: piniaPersistConfig('GlobalState')
})

// piniaPersist(持久化)
const pinia = createPinia()
pinia.use(piniaPluginPersistedstate)

export default pinia
