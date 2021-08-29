import { UserModel } from '@/apis/sys/model/user.model'
import { EnhanceColumnProps, getOperation } from '@/utils/component/table.utils'
import { confirm, message } from '@/utils/component/message.util'
import { Ref, ref } from 'vue'

type Detail = {
  visible: boolean
  data?: UserModel
}

type UserOperation = {
  operationColumn: EnhanceColumnProps<UserModel>
  detailRef: Ref<Detail>
}

export const useUserListOperation = (): UserOperation => {
  const operationColumn = getOperation<UserModel>([
    {
      title: '审核',
      icon: 'all',
      action: (record) => {
        console.log(`record`, record)
      },
    },
    {
      title: '修改',
      icon: 'EditOutlined',
      type: 'WARN',
      action: (record) => {
        console.log(`record`, record)
      },
    },
    {
      title: '删除',
      icon: 'DeleteOutlined',
      type: 'DANGER',
      action: handleDelete,
    },

    {
      title: '详情',
      icon: 'all',
      type: 'INFO',
      action: showDetail,
    },
  ])

  async function handleDelete(record: UserModel) {
    const isOk = await confirm.warn(`删除提示`, `删除之后将不可恢复,确定删除【${record.nickName}】？`)
    if (!isOk) return
    message.success(`${record.nickName}删除成功`)
  }

  const detailRef = ref<Detail>({ visible: false })

  function showDetail(record: UserModel) {
    detailRef.value.visible = true
    detailRef.value.data = record
  }

  return { operationColumn, detailRef }
}
