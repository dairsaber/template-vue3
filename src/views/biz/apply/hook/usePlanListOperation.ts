import { ApplyPlan } from '@/apis/biz/model/apply.model'

import { EnhanceColumnProps, getOperation } from '@/utils/component/table.utils'
import { confirm } from '@/utils/component/message.util'

type PlanOperation = {
  operationColumn: EnhanceColumnProps<ApplyPlan>
}

export type EmitEvent = (event: 'auth' | 'edit' | 'delete' | 'detail', ...args: any[]) => void

export const usePlanListOperation = (emit: EmitEvent): PlanOperation => {
  const operationColumn = getOperation<ApplyPlan>(
    [
      {
        title: '送审',
        icon: 'AuditOutlined',
        action: (record) => emit('auth', record),
      },
      {
        title: '修改',
        icon: 'EditOutlined',
        type: 'WARN',
        action: (record) => emit('edit', record),
      },
      {
        title: '删除',
        icon: 'DeleteOutlined',
        type: 'DANGER',
        action: handleDelete,
      },

      {
        title: '详情',
        icon: 'FileSearchOutlined',
        type: 'INFO',
        action: (record) => emit('detail', record),
      },
    ],
    {
      width: 220,
      fixed: 'right',
    }
  )

  async function handleDelete(record: ApplyPlan) {
    const isOk = await confirm.warn(`删除提示`, `删除之后将不可恢复,确定删除【${record.applyCode}】？`)
    if (!isOk) return
    emit('delete', record)
  }

  return { operationColumn }
}
