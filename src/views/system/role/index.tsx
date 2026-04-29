import api from '@/api/roleApi'
import { useAntdTable } from 'ahooks'
import { Button, Table, Form, Input, Space, Modal, message } from 'antd'
import type { ColumnsType } from 'antd/es/table'
import { useRef } from 'react'
import { Role } from '@/types/api'
import { formatDate } from '@/utils/index'
import CreateRole from './CreateRole'
import SetPermission from './SetPermission'
import { IAction } from '@/types/modal'



export default function RoleList() {
  const [form] = Form.useForm()

  const roleRef = useRef<{
    open: (type: IAction, data?: Role.RoleItem) => void
  } | null>(null)


  const permissionRef = useRef<{
    open: (type: IAction, data?: Role.RoleItem) => void
  } | null>(null)

  const getTableData = ({ current, pageSize }: { current: number; pageSize: number }, formData: Role.Params) => {
    return api.getRoleList({
      ...formData,
      pageNum: current,
      pageSize
    }).then(data => {
      return {
        total: data.page.total,
        list: data.list
      }
    })
  }

  const { tableProps, search } = useAntdTable(getTableData, {
    form,
    defaultPageSize: 10
  })

  const columns: ColumnsType<Role.RoleItem> = [
    {
      title: '角色名称',
      dataIndex: 'roleName',
      key: 'roleName'
    },
    {
      title: '备注',
      dataIndex: 'remark',
      key: 'remark'
    },
    {
      title: '更新时间',
      dataIndex: 'updateTime',
      key: 'updateTime',
      render: (updateTime: string) => {
        return formatDate(updateTime)
      }
    },
    {
      title: '创建时间',
      dataIndex: 'createTime',
      key: 'createTime',
      render: (createTime: string) => {
        return formatDate(createTime)
      }
    },
    {
      title: '操作',
      dataIndex: 'operation',
      render: (_: unknown, record: Role.RoleItem) => {
        return (
          <Space>
            <Button type='text' onClick={() => handleEdit(record)}>编辑</Button>
            <Button type='text' onClick={() => handleSetPermission(record)}>设置权限</Button>
            <Button type='text' onClick={() => handleDelete(record._id)} danger>删除</Button>
          </Space>
        )
      }
    }
  ]

  //创建角色
  const handleCreate = () => {
    roleRef.current?.open('create')
  }

  //批量删除
  const handlePatchConfirm = () => {
    console.log('handleCreate')
  }

  //编辑角色
  const handleEdit = (data: Role.RoleItem) => {
    roleRef.current?.open('edit', data)
  }

  //设置权限
  const handleSetPermission = (record: Role.RoleItem) => {
    permissionRef.current?.open('edit', record)
  }

  //删除角色
  const handleDelete = (_id: string) => {
    Modal.confirm({
      title: '确认删除',
      content: <span>确认删除该角色吗？</span>,
      onOk: () => {
        api.deleteRole({ _id })
        message.success('删除成功')
        search.submit()
      }
    })
  }


  return (
    <div className='role-wrap'>
      <Form form={form} layout='inline' className='search-form'>
        <Form.Item name='roleName' label='角色名称'>
          <Input placeholder='请输入角色名称' />
        </Form.Item>

        <Form.Item>
          <Space>
            <Button type='primary' onClick={search.submit}>
              搜索
            </Button>
            <Button type='default' onClick={search.reset}>
              重置
            </Button>
          </Space>
        </Form.Item>
      </Form>
      <div className='base-table'>
        <div className='header-wrapper'>
          <div className='title'>角色列表</div>
          <div className='action'>
            <Button type='primary' onClick={handleCreate}>
              新增
            </Button>
            <Button type='primary' danger onClick={handlePatchConfirm}>
              批量删除
            </Button>
          </div>
        </div>
        <Table bordered rowKey='_id' columns={columns} {...tableProps} />
      </div>
      {/* 创建角色组件弹框 */}
      <CreateRole mRef={roleRef} update={search.submit} />

      {/* 设置权限 */}
      <SetPermission mRef={permissionRef} update={search.submit} />
    </div>
  )
}
