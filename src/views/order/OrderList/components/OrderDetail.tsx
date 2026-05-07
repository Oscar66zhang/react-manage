import { IDetailProp } from '@/types/modal'
import { Descriptions, Modal } from 'antd'
import { useImperativeHandle, useState } from 'react'
import api from '@/api/orderApi'
import { Order } from '@/types/api'
import { formatDate, formatMoney, formatMobile } from '@/utils'

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
        <Descriptions.Item label='订单编号'>{detail?.orderId}</Descriptions.Item>
        <Descriptions.Item label='下单城市'>{detail?.cityName}</Descriptions.Item>

        <Descriptions.Item label='下单用户'>{detail?.userName}</Descriptions.Item>
        <Descriptions.Item label='手机号'>{formatMobile(detail?.mobile)}</Descriptions.Item>

        <Descriptions.Item label='起点'>{detail?.startAddress}</Descriptions.Item>
        <Descriptions.Item label='终点'>{detail?.endAddress}</Descriptions.Item>

        <Descriptions.Item label='订单金额'>{formatMoney(detail?.orderAmount)}</Descriptions.Item>
        <Descriptions.Item label='用户支付金额'>{formatMoney(detail?.userPayAmount)}</Descriptions.Item>

        <Descriptions.Item label='司机到账金额'>{detail?.driverAmount}</Descriptions.Item>
        <Descriptions.Item label='支付方式'>{detail?.payType === 1 ? '微信支付' : '支付宝支付'}</Descriptions.Item>

        <Descriptions.Item label='司机名称'>{detail?.driverName}</Descriptions.Item>
        <Descriptions.Item label='订单车型'>{detail?.vehicleName}</Descriptions.Item>

        <Descriptions.Item label='订单状态'>
          {detail?.state === 1 ? '待接单' : detail?.state === 2 ? '已接单' : detail?.state === 3 ? '已完成' : '已取消'}
        </Descriptions.Item>
        <Descriptions.Item label='用车时间'>{formatDate(detail?.useTime)}</Descriptions.Item>

        <Descriptions.Item label='订单结束时间'>{formatDate(detail?.endTime)}</Descriptions.Item>
        <Descriptions.Item label='订单创建时间'>{formatDate(detail?.createTime)}</Descriptions.Item>
      </Descriptions>
    </Modal>
  )
}
