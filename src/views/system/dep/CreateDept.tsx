import { Modal, Form, Input, Select, Upload, TreeSelect, message } from 'antd'
import React, { useEffect, useImperativeHandle, useState } from 'react'
import { IAction, IModalProp } from '@/types/modal'
import { Dept, User } from '@/types/api'
import { useForm } from 'antd/es/form/Form'
import api from '@/api/api'


const CreateDept = (props: IModalProp) => {
    const [form] = useForm()

    const [action, setAction] = useState<IAction>('create')
    const [visible, setVisbile] = useState(false)
    const [deptList, setDeptList] = useState<Dept.DeptItem[]>([])
    const [userList, setUserList] = useState<User.UserItem[]>([])

    useEffect(() => {
        getAllUserList()
    }, [])

    //获取部门列表
    const getDeptList = async () => {
        const data = await api.getDeptList()
        setDeptList(data)
    }

    //获取所有用户用户
    const getAllUserList = async () => {
        const data = await api.getAllUserList()
        setUserList(data);
    }

    useImperativeHandle(props.mRef, () => ({
        open
    }))

    //打开弹框函数
    const open = (type: IAction, data?: Dept.EditParams | { parentId: string }): void => {
        setAction(type)
        setVisbile(true)
        getDeptList()
        if (data) {
            form.setFieldsValue(data)
        } else {
            form.resetFields()
        }
    }

    //部门提交
    const handleSubmit = async () => {
        const valid = await form.validateFields();
        if (valid) {
            if (action === 'create') {
                await api.createDept(form.getFieldsValue())
            } else {
                await api.editDept(form.getFieldsValue())
            }
            message.success('操作成功')
            handleCancel();
            props.update()
        }
    }

    //关闭和重置弹窗表单
    const handleCancel = () => {
        setVisbile(false)
        form.resetFields()
    }

    return (
        <Modal
            title={action === 'create' ? '创建部门' : '编辑部门'}
            okText='确定'
            cancelText='取消'
            centered={true}
            width={800}
            open={visible}
            onOk={handleSubmit}
            onCancel={handleCancel}
        >
            <Form form={form} labelAlign='right' labelCol={{ span: 4 }}>
                <Form.Item name='_id' hidden>
                    <Input />
                </Form.Item>
                <Form.Item hidden name='_id'>
                    <Input />
                </Form.Item>
                <Form.Item label='上级部门' name='parentId' rules={[{ required: true, message: '请输入部门名称' }]}>
                    <TreeSelect
                        placeholder="请选择上级部门"
                        allowClear
                        treeDefaultExpandAll
                        fieldNames={{ label: 'deptName', value: '_id' }}
                        treeData={deptList}
                    />
                </Form.Item>

                <Form.Item label='部门名称' name='deptName' rules={[{ required: true, message: '请输入部门名称' }]}>
                    <Input placeholder='请输入部门名称' />
                </Form.Item>

                <Form.Item label='负责人' name='userName' rules={[{ required: true, message: '请选择负责人' }]}>
                    <Select
                        options={userList.map(item => ({ value: item._id, label: item.userName }))}
                    >
                        Jake
                    </Select>
                </Form.Item>

            </Form>
        </Modal>
    )
}
export default CreateDept