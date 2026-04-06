import React from 'react'
import type { FormProps, FieldType } from 'antd'
import { Button, Checkbox, Form, Input } from 'antd'
import './index.less'
export const Login = () => {
  const onFinish = () => {
    console.log('values')
  }
  const onFinishFailed = () => {
    console.log('values')
  }
  return (
    <div className='login'>
      <div className='login-wrapper'>
        <div className='title'>系统登录</div>
        <Form
          name='basic'
          labelCol={{ span: 8 }}
          style={{ maxWidth: 600 }}
          initialValues={{ remember: true }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete='off'
        >
          <Form.Item<FieldType> name='username' rules={[{ required: true, message: 'Please input your username!' }]}>
            <Input />
          </Form.Item>

          <Form.Item<FieldType> name='password' rules={[{ required: true, message: 'Please input your password!' }]}>
            <Input.Password />
          </Form.Item>

          <Form.Item>
            <Button type='primary' htmlType='submit' block>
              登陆
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  )
}
