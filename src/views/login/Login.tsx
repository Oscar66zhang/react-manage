import { Button, Form, Input } from 'antd'
import { message } from '@/utils/AntdGlobal'
import styles from './index.module.css'
import api from '@/api/api'
import { Login as loginApi } from '@/types/api'
import storage from '@/utils/storage'
import { useState } from 'react'

type FieldType = {
  username?: string
  password?: string
}
export const Login = () => {
  const [loading, setLoading] = useState(false)
  const onFinish = async (values: loginApi.params) => {
    setLoading(true)
    const data: any = await api.login(values)
    setLoading(false)
    storage.set('token', data)
    message.success('登录成功')
    const params = new URLSearchParams(location.search)
    location.href = params.get('callback') || '/welcome'
  }
  const onFinishFailed = () => {
    console.log('values')
  }
  return (
    <div className={styles.login}>
      <div className={styles.loginWrapper}>
        <div className={styles.title}>系统登录</div>
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
            <Button type='primary' htmlType='submit' loading={loading} block>
              登陆
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  )
}
