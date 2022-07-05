import http from '@/service/https'
import { Asset } from '@/service/interface/index'
const api = '/asset-quality-monitor'
export const loanAnalysisDetail = (params: Asset.ReqForm) => {
  // return http.post<Asset.ReqLoginForm>(PORT + api + `/loan-analysis-detail`, params, { headers: { noLoading: true } });
  return http.post<Asset.ReqForm>(api + '/loan-analysis-detail', params)
}
