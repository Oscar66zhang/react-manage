import { Button, Form, Input, Space, Table } from "antd"
import { useForm } from "antd/es/form/Form"
import { useEffect, useRef, useState } from "react"
import type { ColumnsType } from 'antd/es/table';
import api from "@/api/api"
import { Dept } from "@/types/api"
import CreateDept from "./CreateDept"
import { IAction } from "@/types/modal"


export default function DepList() {
    const [form] = useForm()

    const [data, setData] = useState<Dept.DeptItem[]>([])
    const deptRef = useRef<{
        open: (type: IAction, data?: Dept.EditParams) => void
    } | null>(null)

    useEffect(() => {
        getDeptList()
    }, [])

    const getDeptList = async (params = {}) => {
        const data = await api.getDeptList(params)
        setData(data)
    }

    const columns: ColumnsType<Dept.DeptItem> = [
        {
            title: "部门名称",
            dataIndex: "deptName",
            key: "deptName",
            width: 200
        },
        {
            title: "负责人",
            dataIndex: "userName",
            key: "userName",
            width: 150
        },
        {
            title: "更新时间",
            dataIndex: "updateTime",
            key: "updateTime",
        },
        {
            title: "创建时间",
            dataIndex: "createTime",
            key: "createTime",
        },
        {
            title: "操作",
            key: "action",
            width: 200,
            render: (_, record) => {
                return <Space>
                    <Button type="text" onClick={handleCreate}>新增</Button>
                    <Button type="text" onClick={() => handleEdit(record)}>编辑</Button>
                    <Button type="text" onClick={handleDelete}>删除</Button>
                </Space>

            }
        }

    ]

    //创建部门
    const handleCreate = () => {
        deptRef.current?.open('create')
    }

    //编辑部门
    const handleEdit = (record: Dept.DeptItem) => {
        deptRef.current?.open('edit', record)
    }

    //删除部门
    const handleDelete = () => {

    }

    const handleSearch = () => {
        const params = form.getFieldsValue()
        getDeptList(params)
    }
    const handleReset = () => {
        form.resetFields();
    }

    return (
        <div>
            <Form className="search-form" layout="inline">
                <Form.Item name="deptName" label="部门名称">
                    <Input placeholder="请输入部门名称" />
                </Form.Item>

                <Form.Item>
                    <Button type="primary" onClick={handleSearch} className="mr10">搜索</Button>
                    <Button type="default" onClick={handleReset}>重置</Button>
                </Form.Item>
            </Form>

            <div className="base-table">
                <div className="header-wrapper">
                    <div className="title">部门列表</div>
                    <div className="action">
                        <Button type="primary" onClick={handleCreate}>新增</Button>
                    </div>
                </div>
                <Table bordered rowKey='_id' dataSource={data} columns={columns} pagination={false} />
            </div>

            <CreateDept mRef={deptRef} update={getDeptList} />
        </div>
    )
}