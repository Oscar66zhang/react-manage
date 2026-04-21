import { Modal, Form, Input, Select, Upload, TreeSelect } from 'antd'
import React, { useState } from 'react'
import { IAction } from '@/types/modal'
import { Dept } from '@/types/api'
import { useForm } from 'antd/es/form/Form'


const CreateDept = () => {
    const [form] = useForm()

    const [action, setAction] = useState<IAction>('create')
    const [deptList, setDeptList] = useState<Dept.DeptItem[]>([])


    const handleSubmit = () => {

    }

    const handleCancel = () => {

    }

    return (
        <Modal
            title={action === 'create' ? '创建部门' : '编辑部门'}
            okText='确定'
            cancelText='取消'
            centered={true}
            width={800}
            open={true}
            onOk={handleSubmit}
            onCancel={handleCancel}
        >
            <Form form={form} labelAlign='right' labelCol={{span:4}}>
                <Form.Item name='userId' hidden>
                    <Input />
                </Form.Item>

                <Form.Item label='上级部门' name='parentId' rules={[{ required: true, message: '请输入用户名称' }]}>
                    <TreeSelect
                        placeholder="请选择上级部门"
                        allowClear
                        treeDefaultExpandAll
                        fieldNames={{ label: 'deptName', value: '_id' }}
                        treeData={deptList}
                    />
                </Form.Item>

                <Form.Item label='部门名称' name='deptName' rules={[{ required: true, message: '请输入用户名称' }]}>
                    <Input placeholder='请输入部门名称' />
                </Form.Item>

                <Form.Item label='负责人' name='userName' rules={[{ required: true, message: '请输入用户名称' }]}>
                    <Select
                        options={
                            [
                                { value: '1', label: '张三' },
                                { value: '2', label: '李四' },
                                { value: '3', label: '王五' },
                            ]
                        }
                    >
                        Jake
                    </Select>
                </Form.Item>

            </Form>
        </Modal>
    )
}

export default CreateDept