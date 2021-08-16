import { request } from '@/utils/http'
import { LoginParams, LoginResultModel, GetUserInfoModel } from './model/userModel'

import { ErrorMessageMode } from '#/axios'

enum Api {
  Login = '/login',
  Logout = '/logout',
  GetUserInfo = '/getUserInfo',
  GetPermCode = '/getPermCode',
}

/**
 * @description: user login api
 */
export function loginApi(params: LoginParams, mode: ErrorMessageMode = 'modal'): Promise<LoginResultModel> {
  return request.post<LoginResultModel>(
    {
      url: Api.Login,
      params,
    },
    {
      errorMessageMode: mode,
    }
  )
}

/**
 * @description: getUserInfo
 */
export function getUserInfo(): Promise<GetUserInfoModel> {
  return request.get<GetUserInfoModel>({ url: Api.GetUserInfo })
}

export function getPermCode(): Promise<string[]> {
  return request.get<string[]>({ url: Api.GetPermCode })
}

export function doLogout(): Promise<void> {
  return request.get({ url: Api.Logout })
}
