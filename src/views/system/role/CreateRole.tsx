import { Modal, Form, Input, Select, Upload, TreeSelect, message, InputNumber, Radio } from 'antd'
import React, { useEffect, useImperativeHandle, useRef, useState } from 'react'
import { IAction, IMenuModalProp, IModalProp } from '@/types/modal'
import { Menu } from '@/types/api'
import { useForm } from 'antd/es/form/Form'
import api from '@/api/roleApi'
import { InfoCircleOutlined } from '@ant-design/icons'
import { Role } from '@/types/api'

export default function CreateRole(props: IModalProp<Role.RoleItem>) {
  const [action, setAction] = useState<IAction>('create')

  const [visible, setVisible] = useState(false)
  const [form] = Form.useForm()

  //暴露组件方法
  useImperativeHandle(props.mRef, () => {
    return {
      open
    }
  })

  const open = (type: IAction, data?: Role.RoleItem) => {
    setAction(type)
    setVisible(true)
    if (data) {
      form.setFieldsValue(data)
    }
  }

  //提交
  const handleOk = async () => {
    const validData = await form.validateFields()
    if (validData) {
      const params = form.getFieldsValue()
      if (action === 'create') {
        await api.createRole(params)
      } else {
        await api.editRole(params)
      }
      message.success('操作成功')
      handleCancel()
    }
  }

  //取消
  const handleCancel = () => {
    form.resetFields()
    setVisible(false)
  }

  return (
    <Modal
      title={action == 'create' ? '新增角色' : '编辑角色'}
      width={600}
      open={visible}
      okText='确认'
      onOk={handleOk}
      onCancel={handleCancel}
      cancelText='取消'
    >
      <Form form={form} labelAlign='right' labelCol={{ span: 4 }} wrapperCol={{ span: 16 }}>
        <Form.Item name='_id' label='角色ID' hidden>
          <Input />
        </Form.Item>

        <Form.Item name='roleName' label='角色名称' rules={[{ required: true, message: '请输入角色名称' }]}>
          <Input placeholder='请输入角色名称' />
        </Form.Item>
        <Form.Item name='remark' label='角色备注'>
          <Input.TextArea placeholder='请输入备注' />
        </Form.Item>
      </Form>
    </Modal>
  )
}


