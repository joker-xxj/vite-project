import axios, { AxiosInstance, AxiosError, AxiosRequestConfig, AxiosResponse } from 'axios'
// import { showFullScreenLoading, tryHideFullScreenLoading } from '@/config/serviceLoading'
import { ResultData } from '@/service/interface'
import { ResultEnum } from '@/enums/httpEnum'
import { checkStatus } from './checkStatus'
import { message } from 'ant-design-vue'
import { GlobalStore } from '@/store/index'
import router from '@/router'

// const axiosCanceler = new AxiosCanceler()
const config = {
  // 默认地址请求地址，可在 .env 开头文件中修改
  baseURL: import.meta.env.VITE_API_BASEURL as string,
  // 设置超时时间（10s）
  timeout: ResultEnum.TIMEOUT as number,
  // 跨域时候允许携带凭证
  withCredentials: false
}
class RequestHttp {
  service: AxiosInstance
  public constructor (config: AxiosRequestConfig) {
    // 实例化axios
    this.service = axios.create(config)
    /**
     * @description 请求拦截器
        * 客户端发送请求 -> [请求拦截器] -> 服务器
        * token校验(JWT) : 接受服务器返回的token,存储到vuex/本地储存当中
        */
    this.service.interceptors.request.use(
      (config: AxiosRequestConfig) => {
        const globalStore = GlobalStore()
        globalStore.setLoading(true)
        // const token: string = globalStore.token
        // return { ...config, headers: { 'x-access-token': token } }
        return config
      },
      (error: AxiosError) => {
        return Promise.reject(error)
      }
    )

    /**
     * @description 响应拦截器
     *  服务器换返回信息 -> [拦截统一处理] -> 客户端JS获取到信息
     */
    this.service.interceptors.response.use(
      (response: AxiosResponse) => {
        const { data } = response
        const globalStore = GlobalStore()
        globalStore.setLoading(false)
        // * 全局错误信息拦截（防止下载文件得时候返回数据流，没有code，直接报错）
        if (data.code && data.code !== ResultEnum.SUCCESS) {
          message.error(data.msg)
          return Promise.reject(data)
        }
        // * 成功请求
        return data
      },
      async (error: AxiosError) => {
        const { response } = error
        // 根据响应的错误状态码，做不同的处理
        if (response) return checkStatus(response.status)
        // 服务器结果都没有返回(可能服务器错误可能客户端断网)，断网处理:可以跳转到断网页面
        if (!window.navigator.onLine) return router.replace({ path: '/500' })
        return Promise.reject(error)
      }
    )
  }

  // * 常用请求方法封装
  get<T> (url: string, params?: object, _object = {}): Promise<ResultData<T>> {
    return this.service.get(url, { params, ..._object })
  }

  post<T> (url: string, params?: object, _object = {}): Promise<ResultData<T>> {
    return this.service.post(url, params, _object)
  }

  put<T> (url: string, params?: object, _object = {}): Promise<ResultData<T>> {
    return this.service.put(url, params, _object)
  }

  delete<T> (url: string, params?: any, _object = {}): Promise<ResultData<T>> {
    return this.service.delete(url, { params, ..._object })
  }
}

export default new RequestHttp(config)
