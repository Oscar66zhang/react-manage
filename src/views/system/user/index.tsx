import { Button, Table, Form, Input, Space, Select, Option } from 'antd'
import { useEffect, useState } from 'react'
import api from '@/api/api'
import { PageParams, User } from '@/types/api'
import { formatDate } from '@/utils/index'
import CreateUser from './CreateUser'

export default function UserList() {
  const [form] = Form.useForm()
  const [data, setData] = useState<User.UserItem[]>([])
  const [total, setTotal] = useState(0)
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
    const list = Array.from({ length: 50 }).map((_, index) => {
      return {
        ...data.list[0],
        userId: Date.now() + index
      }
    })

    setData(list)
    setTotal(list.length)
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
      dataIndex: 'action',
      key: 'action',
      render() {
        return (
          <Space>
            <Button type='text'>编辑</Button>
            <Button type='text' danger>
              删除
            </Button>
          </Space>
        )
      }
    }
  ]

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
            <Button type='primary'>新增</Button>
            <Button type='primary' danger>
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
      <CreateUser />
    </div>
  )
}
