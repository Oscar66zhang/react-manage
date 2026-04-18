import { Modal, Form, Input, Select, InputNumber } from 'antd'

const CreateUser = () => {
  const [form] = Form.useForm()
  const handleSubmit = async () => {
    const valid = form.validateFields()
    console.log(valid)
  }

  const handleCancel = () => {}

  return (
    <Modal
      title='创建用户'
      okText='确定'
      cancelText='取消'
      centered={true}
      width={800}
      open={true}
      onOk={handleSubmit}
      onCancel={handleCancel}
    >
      <Form labelCol={{ span: 4 }} labelAlign='right'>
        <Form.Item label='用户名称' name='userName' rules={[{ required: true, message: '请输入用户名称' }]}>
          <Input placeholder='请输入用户名称'></Input>
        </Form.Item>

        <Form.Item label='用户邮箱' name='userEmail' rules={[{ required: true, message: '请输入邮箱' }]}>
          <Input placeholder='请输入用户邮箱'></Input>
        </Form.Item>

        <Form.Item label='用户邮箱' name='userEmail'>
          <Input placeholder='请输入用户邮箱'></Input>
        </Form.Item>

        <Form.Item label='手机号' name='mobile'>
          <Input type='number' placeholder='请输入手机号'></Input>
        </Form.Item>

        <Form.Item label='部门' name='deptId' rules={[{ required: true, message: '请输入部门' }]}>
          <Input placeholder='请输入部门'></Input>
        </Form.Item>

        <Form.Item label='岗位' name='Job'>
          <Input placeholder='请输入岗位'></Input>
        </Form.Item>

        <Form.Item label='状态' name='state'>
          <Select
            defaultValue={'0'}
            options={[
              { value: '0', label: '所有' },
              { value: '1', label: '在职' },
              { value: '2', label: '试用期' },
              { value: '3', label: '离职' }
            ]}
          />
        </Form.Item>

        <Form.Item label='角色' name='roleList'>
          <Input placeholder='请输入角色'></Input>
        </Form.Item>
      </Form>
    </Modal>
  )
}

export default CreateUser
