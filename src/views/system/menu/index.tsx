import { Button, Form, Input, message, Modal, Select, Space, Table } from "antd"
import { useForm } from "antd/es/form/Form"
import { useEffect, useRef, useState } from "react"
import type { ColumnsType } from 'antd/es/table';
import api from "@/api/api"
import { Menu } from "@/types/api"
import CreateMenu from "./CreateMenu";
import { IAction } from "@/types/modal"
import { formatDate } from "@/utils";


export default function MenuList() {
    const [form] = useForm()

    const [data, setData] = useState<Menu.MenuItem[]>([])
    const menuRef = useRef<{
        open: (type: IAction, data?: Menu.EditParams | { parentId?: string; orderBy?: number }) => void
    } | null>(null)

    useEffect(() => {
        getMenuList() 
    }, [])

    const getMenuList = async () => {
        const data = await api.getMenuList(form.getFieldsValue())
        setData(data)
    }

    const columns: ColumnsType<Menu.MenuItem> = [
        {
            title: "菜单名称",
            dataIndex: "menuName",
            key: "deptName",
            width: 200
        },
        {
            title: "菜单图标",
            dataIndex: "icon",
            key: "icon",
            width: 150
        },
        {
            title: "菜单类型",
            dataIndex: "menuType",
            key: "menuType",
            render(menuType) {
                return menuType === 1 ? '菜单' : menuType === 2 ? '按钮' : '页面'
            }
        },
        {
            title: "权限标识",
            dataIndex: "menuCode",
            key: "menuCode",
        },
        {
            title: "路由地址",
            dataIndex: "path",
            key: "path",
        },

        {
            title: "组件名称",
            dataIndex: "component",
            key: "component",
        },


        {
            title: "创建时间",
            dataIndex: "createTime",
            key: "createTime",
            render(createTime) {
                return formatDate(createTime)
            }
        },

        {
            title: "操作",
            key: "action",
            width: 200,
            render: (_, record) => {
                return <Space>
                    <Button type="text" onClick={() => handleSubCreate(record)}>新增</Button>
                    <Button type="text" onClick={() => handleEdit(record)}>编辑</Button>
                    <Button type="text" danger onClick={() => handleDelete(record)}>删除</Button>
                </Space>

            }
        }

    ]

    //创建部门
    const handleCreate = () => {
        menuRef.current?.open('create', { parentId: '', orderBy: data.length })
    }


    const handleSubCreate = (record: Menu.MenuItem) => {
        menuRef.current?.open('create', { parentId: record._id, orderBy: record.children?.length })
    }

    //编辑部门
    const handleEdit = (record: Menu.MenuItem) => {
        menuRef.current?.open('edit', record)
    }

    //删除部门
    const handleDelete = (record: Menu.MenuItem) => {
        let text = ''
        if (record.menuType === 1) text = '菜单'
        if (record.menuType === 2) text = '按钮'
        if (record.menuType === 3) text = '页面'
        Modal.confirm({
            title: "确认",
            content: `确认删除该${text}吗?`,
            onOk() {
                handleDeleteSubmit(record._id);
            }
        })
    }

    //删除提交
    const handleDeleteSubmit = async (_id: string) => {
        await api.deleteMenu({ _id })
        message.success('删除成功')
        getMenuList()
    }

    const handleSearch = () => {
        const params = form.getFieldsValue()
        getMenuList()
    }
    const handleReset = () => {
        form.resetFields();
    }

    return (
        <div>
            <Form className="search-form" layout="inline" form={form} initialValues={{ menuState: 1 }}>
                <Form.Item name="menuName" label="菜单名称">
                    <Input placeholder="请输入菜单名称" />
                </Form.Item>

                <Form.Item name="menuState" label="菜单状态">
                    <Select style={{ width: 120 }}
                        options={[
                            { value: 1, label: '正常' },
                            { value: 2, label: '停用' },
                        ]}
                        defaultValue={1}
                    />
                </Form.Item>

                <Form.Item>
                    <Button type="primary" onClick={handleSearch} className="mr10">搜索</Button>
                    <Button type="default" onClick={handleReset}>重置</Button>
                </Form.Item>
            </Form>

            <div className="base-table">
                <div className="header-wrapper">
                    <div className="title">菜单列表</div>
                    <div className="action">
                        <Button type="primary" onClick={handleCreate}>新增</Button>
                    </div>
                </div>
                <Table bordered rowKey='_id' dataSource={data} columns={columns} pagination={false} />
            </div>

            <CreateMenu mRef={menuRef} update={getMenuList} />

        </div>
    )
}