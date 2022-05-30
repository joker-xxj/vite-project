import axios, { AxiosRequestConfig } from 'axios'
import { message } from 'ant-design-vue'
// import { store } from '@/store'
const request = axios.create({
  // baseURL: import.meta.env.VITE_API_BASEURL
})

// 请求拦截器
request.interceptors.request.use(function (config) {
  // 统一设置用户token
  // const user = store.state.user
  // if (user && user.taken) {
  //   config.headers.Authorzation = `Bearer ${user.taken}`
  // }
  return config
}, function (error) {
  // Do something with request error
  return Promise.reject(error)
})

// 响应拦截器
request.interceptors.response.use(function (response) {
  if (response.data.status && response.data.status !== 200) {
    message.error(response.data.message || '请求失败,请稍后重试')
    return Promise.reject(response.data)
  }
  return response
}, function (error) {
  // Any status codes that falls outside the range of 2xx cause this function to trigger
  // Do something with response error
  return Promise.reject(error)
})
export default <T = any>(config:AxiosRequestConfig) => {
  return request(config).then(res => {
    return res.data.data as T
  })
}
