import { Button, Table, Form, Input, Space, Select, Modal } from 'antd'
import { useEffect, useRef, useState } from 'react'
import api from '@/api/api'
import { PageParams, User } from '@/types/api'
import { formatDate } from '@/utils/index'
import CreateUser from './CreateUser'
import { IAction } from '@/types/modal'
import { message } from '@/utils/AntdGlobal'
import { useAntdTable } from 'ahooks'
import AuthButton from '@/components/AuthButton'


export default function OrderList() {
    const [form] = Form.useForm()
    const getTableData = ({ current, pageSize }: { current: number; pageSize: number }, formData: User.SearchParams) => {
        return api
            .getUserList({
                ...formData,
                pageNum: current,
                pageSize: pageSize
            })
            .then(data => {
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

    const columns: ColumnsType<Order.OrderItem> = [
        {
            title: '订单编号',
            dataIndex: 'orderId',
            key: 'orderId'
        },
        {
            title: '城市',
            dataIndex: 'cityName',
            key: 'cityName'
        },
        {
            title: '下单地址',
            dataIndex: 'startAddress',
            key: 'startAddress'
        },
        {
            title: '下单时间',
            dataIndex: '',
            key: 'orderState'
        },
        {
            title: '订单价格',
            dataIndex: 'orderAmount',
            key: 'orderAmount'
        },
        {
            title: '订单状态',
            dataIndex: 'state',
            key: 'state',
        },
        {
            title: '用户名称',
            dataIndex: 'userName',
            key: 'userName',
        },
        {
            title: '司机名称',
            dataIndex: 'driverName',
            key: 'driverName',
        },
        {
            title: '操作',
            dataIndex: 'action',
            key: 'action',
            render: (_,record: Order.OrderItem) => {
                return <Button type='primary' onClick={() => handleEdit(record)}>编辑</Button>
            }
        }
    ]

    return (
        <div className='OrderList'>
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
                        <Button type='primary'>
                            新增
                        </Button>
                    </div>
                </div>
                <Table
                    rowKey='userId'
                    bordered
                    columns={columns}
                    {...tableProps}
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