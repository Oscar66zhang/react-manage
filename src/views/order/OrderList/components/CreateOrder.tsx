import { Modal, Form, Row, Col, Select, Input, DatePicker, message } from 'antd'
import { IModalProp } from '@/types/modal'
import { useEffect, useImperativeHandle, useState } from 'react'
import api from '@/api/orderApi'
import { Order } from '@/types/api'


const CreateOrder = (props: IModalProp) => {
  const [visible, setVisible] = useState(false)
  const [form] = Form.useForm()
  const [cityList, setCityList] = useState<Order.DictItem[]>([])
  const [vehicleList, setVehicleList] = useState<Order.DictItem[]>([])

  useEffect(() => {
    getInitData()
  }, [])

  const getInitData = async () => {
    const cityRes = await api.getCityList()
    const vehicleRes = await api.getVehicleList()
    setCityList(cityRes)
    setVehicleList(vehicleRes)
  }

  useImperativeHandle(props.mRef, () => {
    return {
      open
    } 
  })

  const open = () => {
    setVisible(true)
  }

  const handleCancel = () => {
    form.resetFields()
    setVisible(false)
  }
  const handleOk = async () => {
    const valid = await form.validateFields()
    if (valid) {
      await api.createOrder(form.getFieldsValue())
      message.success('创建成功')
      handleCancel()
      props.update()
    }
  }

  return (
    <Modal
      title='创建订单'
      width={800}
      open={visible}
      okText='确定'
      cancelText='取消'
      onOk={handleOk}
      onCancel={handleCancel}
    >
      <Form form={form} layout='horizontal' labelAlign='right' labelCol={{ span: 8 }} wrapperCol={{ span: 16 }}>
        <Row>
          <Col span={12}>
            <Form.Item name='cityName' label='城市名称' rules={[{ required: true, message: '请选择城市' }]}>
              <Select
                placeholder='请选择城市'
                options={cityList.map(item => ({
                  value: item.id,
                  label: item.name,
                  key:item.id
                }))}
              />
            </Form.Item>
          </Col>

          <Col span={12}>
            <Form.Item name='vehicleName' label='车型' rules={[{ required: true, message: '请选择车型' }]}>
              <Select
                placeholder='请选择城市'
                options={vehicleList.map(item => ({
                  value: item.id,
                  label: item.name,
                   key:item.id
                }))}
              />
            </Form.Item>
          </Col>
        </Row>

        <Row>
          <Col span={12}>
            <Form.Item name='userName' label='用户名称' rules={[{ required: true, message: '请输入用户名称' }]}>
              <Input placeholder='请输入用户名称' />
            </Form.Item>
          </Col>

          <Col span={12}>
            <Form.Item name='mobile' label='手机号'>
              <Input placeholder='请输入下单手机号' />
            </Form.Item>
          </Col>
        </Row>

        <Row>
          <Col span={12}>
            <Form.Item name='startAddress' label='起始地址'>
              <Input placeholder='请输入起始地址' />
            </Form.Item>
          </Col>

          <Col span={12}>
            <Form.Item name='endAddress' label='结束地址'>
              <Input placeholder='请输入结束地址' />
            </Form.Item>
          </Col>
        </Row>

        <Row>
          <Col span={12}>
            <Form.Item name='orderAmount' label='下单金额' rules={[{ required: true, message: '请输入下单金额' }]}>
              <Input placeholder='请输入下单金额' />
            </Form.Item>
          </Col>

          <Col span={12}>
            <Form.Item name='userPayAmount' label='支付金额' rules={[{ required: true, message: '请输入支付金额' }]}>
              <Input type='number' placeholder='请输入支付金额' />
            </Form.Item>
          </Col>
        </Row>

        <Row>
          <Col span={12}>
            <Form.Item name='driverName' label='司机名称' rules={[{ required: true, message: '请输入司机名称' }]}>
              <Input placeholder='请输入司机名称' />
            </Form.Item>
          </Col>

          <Col span={12}>
            <Form.Item name='driverAmount' label='司机金额' rules={[{ required: true, message: '请输入司机金额' }]}>
              <Input type='number' placeholder='请输入司机金额' />
            </Form.Item>
          </Col>
        </Row>

        <Row>
          <Col span={12}>
            <Form.Item name='payType' label='支付方式'>
              <Select
                placeholder='请选择支付方式'
                options={[
                  { label: '微信', value: 1 },
                  { label: '支付宝', value: 2 }
                ]}
              />
            </Form.Item>
          </Col>

          <Col span={12}>
            <Form.Item name='state' label='订单状态'>
              <Select
                placeholder='请选择订单状态'
                options={[
                  { label: '进行中', value: 1 },
                  { label: '已完成', value: 2 },
                  { label: '超时', value: 3 },
                  { label: '取消', value: 4 }
                ]}
              />
            </Form.Item>
          </Col>
        </Row>

        <Row>
          <Col span={12}>
            <Form.Item name='useTime' label='用车时间'>
              <DatePicker placeholder='请选择用车时间' />
            </Form.Item>
          </Col>

          <Col span={12}>
            <Form.Item name='endTime' label='结束时间'>
              <DatePicker placeholder='请选择结束时间' />
            </Form.Item>
          </Col>
        </Row>
      </Form>
    </Modal>
  )
}

export default CreateOrder
