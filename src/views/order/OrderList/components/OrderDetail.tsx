import { IDetailProp } from '@/types/modal'
import { Descriptions, Modal } from 'antd'
import { useImperativeHandle, useState } from 'react'
import api from '@/api/orderApi'
import { Order } from '@/types/api'

export default function OrderDetail(props: IDetailProp) {
  const [visible, setVisible] = useState(false)
  const [detail, setDetail] = useState<Order.OrderItem>()

  useImperativeHandle(props.mRef, () => {
    return {
      open
    }
  })

  //打开弹出、暴露方法
  const open = async (orderId: string) => {
    setVisible(true)
    const detail = await api.getOrderDetail(orderId)
    setDetail(detail)
  }

  const handleCancel = () => {
    setVisible(false)
  }
  return (
    <Modal title='订单详情' width={800} open={visible} footer={false} onCancel={handleCancel}>
      <Descriptions column={2} style={{ padding: '10px 30px' }}>
        <Descriptions.Item label='订单编号'>T001</Descriptions.Item>
        <Descriptions.Item label='下单城市'>T002</Descriptions.Item>
      </Descriptions>
    </Modal>
  )
}
