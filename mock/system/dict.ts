//  /dev-api/system/dict/data/type/

import { MockMethod } from 'vite-plugin-mock'
import { requestParams, resultSuccess } from '../_util'

const dicts = [
  {
    type: 'sys_normal_disable',

    data: [
      {
        dictCode: 6,
        dictSort: 1,
        dictLabel: '正常',
        dictValue: '0',
        dictType: 'sys_normal_disable',
        showType: 'DEFAULT',
      },
      {
        dictCode: 7,
        dictSort: 2,
        dictLabel: '停用',
        dictValue: '1',
        dictType: 'sys_normal_disable',
        showType: 'DANGER',
      },
    ],
  },
]

export default [
  {
    url: '/dev-api/system/dict/data/type/:id',
    timeout: 300,
    method: 'get',
    response: ({ query }: requestParams) => {
      const data = dicts[query.id] ?? []
      return resultSuccess(data)
    },
  },
] as MockMethod[]
