import { Button, Table, Form, Input, Space, Select, Modal } from 'antd'
import { useEffect, useRef, useState } from 'react'
import { PageParams, User } from '@/types/api'
import { formatDate, formatMoney } from '@/utils/index'
import { useAntdTable } from 'ahooks'
import { Order } from '@/types/api'
import { ColumnsType } from 'antd/es/table'
import orderApi from '@/api/orderApi'
import CreateOrder from './components/CreateOrder'
import OrderDetail from './components/OrderDetail'

export default function OrderList() {
  const [form] = Form.useForm()
  const orderRef = useRef<{ open: () => void } | null>(null)
  const detailRef = useRef<{ open: (orderId: string) => void } | null>(null)
  const getTableData = ({ current, pageSize }: { current: number; pageSize: number }, formData: Order.SearchParams) => {
    return orderApi
      .getOrderList({
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
    defaultParams: [
      {
        current: 1,
        pageSize: 10
      },
      {
        state: 1
      }
    ]
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
      key: 'cityName',
      width: 80
    },
    {
      title: '下单地址',
      dataIndex: 'startAddress',
      key: 'startAddress',
      render(_, record) {
        return (
          <div>
            <p>开始地址:{record.startAddress}</p>
            <p>结束地址:{record.endAddress}</p>
          </div>
        )
      },
      width: 160
    },
    {
      title: '下单时间',
      dataIndex: 'createTime',
      key: 'createTime',
      render(createTime) {
        return formatDate(createTime)
      },
      width: 120
    },
    {
      title: '订单价格',
      dataIndex: 'orderAmount',
      key: 'orderAmount',
      render(orderAmount) {
        return formatMoney(orderAmount)
      }
    },
    {
      title: '订单状态',
      dataIndex: 'state',
      key: 'state',
      render(state) {
        if (state === 1) return '进行中'
        if (state === 2) return '已完成'
        if (state === 3) return '超时'
        if (state === 4) return '取消'
      }
    },
    {
      title: '用户名称',
      dataIndex: 'userName',
      key: 'userName'
    },
    {
      title: '司机名称',
      dataIndex: 'driverName',
      key: 'driverName'
    },
    {
      title: '操作',
      dataIndex: 'action',
      key: 'action',
      render: (_, record: Order.OrderItem) => {
        return (
          <Space>
            <Button type='text' onClick={() => handleDetail(record.orderId)}>
              详情
            </Button>
            <Button type='text'>打点</Button>
            <Button type='text'>轨迹</Button>
            <Button type='text' danger>
              删除
            </Button>
          </Space>
        )
      }
    }
  ]

  //创建订单
  const handleCreate = () => {
    orderRef?.current?.open()
  }

  //订单详情
  const handleDetail = (orderId: string) => {
    detailRef.current?.open(orderId)
  }

  return (
    <div className='OrderList'>
      <Form className='search-form' form={form} layout='inline'>
        <Form.Item name='orderId' label='订单ID'>
          <Input placeholder='请输入订单ID' />
        </Form.Item>
        <Form.Item name='userName' label='用户名称'>
          <Input placeholder='请输入用户名称' />
        </Form.Item>
        <Form.Item name='state' label='订单状态'>
          <Select
            style={{ width: 120 }}
            defaultValue={'0'}
            options={[
              { value: 1, label: '进行中' },
              { value: 2, label: '已完成' },
              { value: 3, label: '超时' },
              { value: 4, label: '取消' }
            ]}
          ></Select>
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
          <div className='title'>用户列表</div>
          <div className='action'>
            <Button type='primary' onClick={handleCreate}>
              新增
            </Button>
          </div>
        </div>
        <Table rowKey='_id' bordered columns={columns} {...tableProps} />
      </div>
      {/* 创建订单组件 */}
      <CreateOrder mRef={orderRef} update={search.submit} />
      {/* 订单详情 */}
      <OrderDetail mRef={detailRef} />
    </div>
  )
}
