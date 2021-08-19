import { request } from '@/utils/http'
import { LoginParams, LoginResultModel, GetUserInfoModel, GetCaptchaImageModel } from './model/user.model'

import { Result } from '#/axios'

enum Api {
  Login = '/login',
  Logout = '/logout',
  GetUserInfo = '/getUserInfo',
  GetCaptchaImage = '/captchaImage',
}

/**
 * @description: user login api
 */
export function loginApi(params: LoginParams): Promise<Result<LoginResultModel>> {
  return request.post<Result<LoginResultModel>>({
    url: Api.Login,
    params,
  })
}

/**
 * @description: getUserInfo
 */
export function getUserInfo(): Promise<Result<GetUserInfoModel>> {
  return request.get<Result<GetUserInfoModel>>({ url: Api.GetUserInfo })
}

export function getCaptchaImage(): Promise<GetCaptchaImageModel> {
  return request.get<GetCaptchaImageModel>({ url: Api.GetCaptchaImage }, { isTransformResponse: false })
}

export function doLogout(): Promise<void> {
  return request.get({ url: Api.Logout })
}
