import { Modal, Form, Input, Select, Upload, TreeSelect } from 'antd'
import { useEffect, useImperativeHandle, useState } from 'react'
import { LoadingOutlined, PlusOutlined } from '@ant-design/icons'
import storage from '@/utils/storage'
import type { RcFile, UploadFile, UploadProps } from 'antd/es/upload'
import { message } from '@/utils/AntdGlobal'
import type { UploadChangeParam } from 'antd/es/upload'
import { IAction, IModalProp } from '@/types/modal'
import api from '@/api/api'
import roleApi from '@/api/roleApi'
import { Dept, User, Role } from '@/types/api'

const CreateUser = (props: IModalProp) => {
  const [form] = Form.useForm()
  const [visible, setVisbile] = useState(false)
  const [action, setAction] = useState<IAction>('create')
  const [img, setImg] = useState('')
  const [loading, setLoading] = useState(false)
  const [deptList, setDeptList] = useState<Dept.DeptItem[]>([])
  const [roleList, setRoleList] = useState<Role.RoleItem[]>([])

  //获取部门列表
  const geteptList = async () => {
    const list = await api.getDeptList()
    setDeptList(list)
  }


  //获取用户列表
  const geRoleList = async () => {
    const list = await roleApi.getAllRoleList()
    setRoleList(list)
  }

  useEffect(() => {
    geteptList()
    geRoleList()
  }, [])

  //暴露子组件open方法
  useImperativeHandle(props.mRef, () => {
    return {
      open
    }
  })

  //调用弹框显示方法
  const open = (type: IAction, data?: User.UserItem) => {
    setAction(type)
    setVisbile(true)
    if (type === 'edit' && data) {
      form.setFieldsValue(data)
      setImg(data.userImg)
    }
  }

  const handleSubmit = async () => {
    try {
      const valid = await form.validateFields()
      console.log('表单校验通过：', valid)

      const params = {
        ...valid,
        userImg: img
      }

      if (action === 'create') {
        const data = await api.createUser(params)
        message.success('创建成功')
        handleCancel()
        props.update()
      } else {
        const data = await api.editUser(params)
        message.success('编辑成功')
      }
      handleCancel()
      props.update()
    } catch (error) {
      console.error('提交失败：', error)
    }
  }

  const handleCancel = () => {
    setVisbile(false)
    form.resetFields()
  }

  const handleUploadChange: UploadProps['onChange'] = (info: UploadChangeParam<UploadFile>) => {
    if (info.file.status === 'uploading') {
      setLoading(true)
      return
    }

    if (info.file.status === 'done') {
      setLoading(false)
      const { code, data, message } = info.file.response
      if (code === 200) {
        setImg(data.file)
      } else {
        message.error(message)
      }
    } else if (info.file.status === 'error') {
      message.error('服务器异常，请稍后重试')
    }
  }

  //上传之前，接口处理
  const beforeUpload = (file: RcFile) => {
    const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png'
    if (!isJpgOrPng) {
      message.error('You can only upload JPG/PNG file!')
    }
    const isLt500K = file.size / 1024 / 1024 < 0.5
    if (!isLt500K) {
      message.error('Image must smaller than 500K!')
    }
    return isJpgOrPng && isLt500K
  }

  return (
    <Modal
      title={action === 'create' ? '创建用户' : '编辑用户'}
      okText='确定'
      cancelText='取消'
      centered={true}
      width={800}
      open={visible}
      onOk={handleSubmit}
      onCancel={handleCancel}
    >
      <Form form={form} labelCol={{ span: 4 }} labelAlign='right'>
        <Form.Item name='userId' hidden>
          <Input />
        </Form.Item>

        <Form.Item label='用户名称' name='userName' rules={[{ required: true, message: '请输入用户名称' }]}>
          <Input placeholder='请输入用户名称'></Input>
        </Form.Item>

        <Form.Item label='用户邮箱' name='userEmail' rules={[{ required: true, message: '请输入邮箱' }]}>
          <Input placeholder='请输入用户邮箱'></Input>
        </Form.Item>

        <Form.Item label='手机号' name='mobile'>
          <Input type='number' placeholder='请输入手机号'></Input>
        </Form.Item>

        <Form.Item label='部门' name='deptId' rules={[{ required: true, message: '请选择部门' }]}>
          <TreeSelect
            showSearch
            style={{ width: '100%' }}
            styles={{
              popup: {
                root: { maxHeight: 400, overflow: 'auto' },
              },
            }}
            placeholder="请选择部门"
            allowClear
            treeDefaultExpandAll
            treeData={deptList}
            showCheckedStrategy={TreeSelect.SHOW_ALL}
            fieldNames={{ label: 'deptName', value: '_id' }}
          />
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

        <Form.Item label='系统角色' name='roleList'>
          <Select placeholder='请选择系统角色'>
            {
              roleList.map((item) => {
                return <option
                  value={item._id}
                  key={item._id}>
                  {item.roleName}
                </option>
              })
            }
          </Select>
        </Form.Item>

        <Form.Item label='用户头像'>
          <Upload
            listType='picture-circle'
            showUploadList={false}
            headers={{
              Authorization: 'Bearer' + storage.get('token'),
              icode: 'B815F86524423DB0'
            }}
            action='/api/users/upload'
            beforeUpload={beforeUpload}
            onChange={handleUploadChange}
          >
            {img ? (
              <img title='img' src={img} style={{ width: '100%' }} />
            ) : (
              <div>
                {loading ? <LoadingOutlined /> : <PlusOutlined />}
                <div style={{ marginTop: 5 }}>上传头像</div>
              </div>
            )}
          </Upload>
        </Form.Item>
      </Form>
    </Modal>
  )
}

export default CreateUser
