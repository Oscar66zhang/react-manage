import { Button, Form, Input } from 'antd'
import styles from './index.module.css'
import api from '@/api/api'

type FieldType = {
  username?: string
  password?: string
}
export const Login = () => {
  const onFinish = (values: any) => {
    console.log('values', values)
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
            <Button type='primary' htmlType='submit' block>
              登陆
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  )
}
