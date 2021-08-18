import { request } from '@/utils/http'
import { RemoteRoute } from './model/remoteRoute.model'
enum Api {
  GetRoutes = '/getRouters',
}

// 获取路由配置
export const getRoutesList = (): Promise<RemoteRoute[]> => {
  return request.get<RemoteRoute[]>({
    url: Api.GetRoutes,
  })
}
