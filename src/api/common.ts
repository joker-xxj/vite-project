/**
 * 公共基础接口模块
 */
import request from '@/utils/request'
import { ILoginInfo } from './types/common'
export const getInfo = () => {
  return request<ILoginInfo>({
    method: 'GET',
    url: '/login/info'
  })
}
