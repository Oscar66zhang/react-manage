import { Button, Table, Form, Input, Space, Select, Modal } from 'antd'
import { useEffect, useRef, useState } from 'react'
import api from '@/api/api'
import { PageParams, User } from '@/types/api'
import { formatDate } from '@/utils/index'
import CreateUser from './CreateUser'
import { IAction } from '@/types/modal'
import { message } from '@/utils/AntdGlobal'

export default function UserList() {
  const [form] = Form.useForm()
  const [userIds, setUserIds] = useState<number[]>([])

  const [data, setData] = useState<User.UserItem[]>([])
  const [total, setTotal] = useState(0)

  const userRef = useRef<{
    open: (type: IAction, data?: User.UserItem) => void | undefined
  }>()

  const [pagination, setPagination] = useState({
    current: 1,
    pageSize: 10
  })

  useEffect(() => {
    getUserList({
      pageNum: pagination.current,
      pageSize: pagination.pageSize
    })
  }, [pagination.current, pagination.pageSize])

  //搜索
  const handleSearch = () => {
    getUserList({
      pageNum: 1,
      pageSize: pagination.pageSize
    })
  }

  //重置表单
  const handleReset = () => {
    form.resetFields()
  }

  //获取用户列表
  const getUserList = async (params: PageParams) => {
    const values = form.getFieldsValue() //获取表单里所有用户输入的值，返回一个对象
    const data = await api.getUserList({
      ...values,
      pageNum: params.pageNum,
      pageSize: params.pageSize
    })

    setData(data.list)
    setTotal(data.list.length)
    setPagination({
      current: data.page.pageNum,
      pageSize: data.page.pageSize
    })
  }

  const columns = [
    {
      title: '用户ID',
      dataIndex: 'userId',
      key: 'userId'
    },
    {
      title: '用户名',
      dataIndex: 'userName',
      key: 'userName'
    },
    {
      title: '用户邮箱',
      dataIndex: 'userEmail',
      key: 'userEmail'
    },
    {
      title: '用户角色',
      dataIndex: 'role',
      key: 'role',
      render(role: number) {
        return {
          0: '超级管理员',
          1: '管理员',
          2: '体验管理员',
          3: '普通用户'
        }[role]
      }
    },
    {
      title: '用户状态',
      dataIndex: 'state',
      key: 'state',
      render(state: number) {
        return {
          0: '在职',
          1: '离职',
          2: '试用期'
        }[state]
      }
    },
    {
      title: '注册时间',
      dataIndex: 'registerTime',
      key: 'registerTime',
      render(createTime: string) {
        return formatDate(createTime)
      }
    },
    // {
    //   title: '最后登录时间',
    //   dataIndex: 'lastLoginTime',
    //   key: 'lastLoginTime'
    // },
    {
      title: '操作',
      key: 'action',
      render(record: User.UserItem) {
        return (
          <Space>
            <Button type='text' onClick={() => handleEdit(record)}>
              编辑
            </Button>
            <Button type='text' danger onClick={() => handleDel(record.userId)}>
              删除
            </Button>
          </Space>
        )
      }
    }
  ]

  //创建用户
  const handleCreate = () => {
    userRef.current?.open('create')
  }

  // 编辑用户
  const handleEdit = (record: User.UserItem) => {
    userRef.current?.open('edit', record)
  }

  //删除用户
  const handleDel = (userId: number) => {
    Modal.confirm({
      title: '删除确认',
      content: <span>确认删除该用户吗？</span>,
      onOk: async () => {
        handleUserDelSubmit([userId])
      }
    })
  }

  //批量确认删除
  const handlePatchConfirm = () => {
    if (userIds.length === 0) {
      message.error('请选择要删除的用户')
      return
    }
    Modal.confirm({
      title: '删除确认',
      content: <span>确认删除该批用户吗？</span>,
      onOk: () => {
        handleUserDelSubmit(userIds)
      }
    })
  }


  const handleUserDelSubmit = async (ids: number[]) => {
    try {
      await api.delUser({
        userIds: ids
      })
      message.success('删除成功')
      setUserIds([])
      // search.reset()
    } catch (error) {
      console.log("删除用户有误:", error);

    }
  }

  return (
    <div className='user-list'>
      <Form className='search-form' form={form} layout='inline'>
        <Form.Item name='userId' label='用户ID'>
          <Input placeholder='请输入用户ID' />
        </Form.Item>
        <Form.Item name='userName' label='用户名称'>
          <Input placeholder='请输入用户名称' />
        </Form.Item>
        <Form.Item name='userName' label='状态'>
          <Select
            style={{ width: 120 }}
            defaultValue={'0'}
            options={[
              { value: '0', label: '所有' },
              { value: '1', label: '在职' },
              { value: '2', label: '试用期' },
              { value: '3', label: '离职' }
            ]}
          ></Select>
        </Form.Item>

        <Form.Item>
          <Space>
            <Button type='primary' onClick={handleSearch}>
              搜索
            </Button>
            <Button type='default' onClick={handleReset}>
              重置
            </Button>
          </Space>
        </Form.Item>
      </Form>
      <div className='base-table'>
        <div className='header-wrapper'>
          <div className='title'>用户列表</div>
          <div className='action'>
            <Button type='primary' onClick={handleCreate}>
              新增
            </Button>
            <Button type='primary' danger onClick={handlePatchConfirm}>
              批量删除
            </Button>
          </div>
        </div>
        <Table
          rowKey='userId'
          bordered
          rowSelection={{ type: 'checkbox' }}
          dataSource={data}
          columns={columns}
          pagination={{
            position: ['bottomRight'],
            current: pagination.current,
            pageSize: pagination.pageSize,
            total,
            showQuickJumper: true,
            showSizeChanger: true,
            showTotal: function (total) {
              return `总共${total}条`
            },
            onChange: (page, pageSize) => {
              setPagination({
                current: page,
                pageSize
              })
            }
          }}
        />
        ;
      </div>
      <CreateUser
        mRef={userRef}
        update={() => {
          getUserList({
            pageNum: 1,
            pageSize: pagination.pageSize
          })
        }}
      />
    </div>
  )
}
