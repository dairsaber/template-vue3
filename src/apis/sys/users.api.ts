import { QueryParams } from './../../@types/request'
import { PaginationList } from '../../@types/model/model'
import { UserModel } from './model/user.model'
import { request } from '@/utils/http'
import { Result } from '#/axios'
// 用户管理

enum Api {
  getUsers = '/system/user/list',
}

export interface GetUsersParams extends QueryParams {
  name: string
}

export async function getUsers(params: GetUsersParams): Promise<Result<PaginationList<UserModel>>> {
  return request.get<Result<PaginationList<UserModel>>>({
    url: Api.getUsers,
    params,
  })
}
