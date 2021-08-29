import { message as msg, Modal, ModalFuncProps } from 'ant-design-vue'
import BaseIcon from '@/components/base-icon/BaseIcon.vue'
import { colorTypes } from '@/settings/color.conf'
import { VNode } from 'vue'
import 'ant-design-vue/es/message/style/index.css'
import 'ant-design-vue/es/modal/style/index.css'

export const message = {
  success: msg.success,
  error: msg.error,
  warn: msg.warn,
  info: msg.info,
}

type ConfirmOptions = Omit<ModalFuncProps, 'title' | 'content' | 'onOk' | 'onCancel'>
type ConfirmFactory = (color: string, icon: string) => (title: string, content?: string | VNode, option?: ConfirmOptions) => Promise<boolean>

const confirmFactory: ConfirmFactory = (color, icon) => {
  return (title, content?, option?) =>
    new Promise((r) => {
      Modal.confirm({
        title: (
          <span style={{ color }}>
            {icon && <BaseIcon icon={icon} />}
            &nbsp;
            {title}
          </span>
        ),
        content,
        onOk: () => r(true),
        onCancel: () => r(false),
        ...(option ?? {}),
      })
    })
}

export const confirm = {
  warn: confirmFactory(colorTypes.WARN, 'ExclamationCircleFilled'),
  info: confirmFactory(colorTypes.INFO, 'InfoCircleFilled'),
}
