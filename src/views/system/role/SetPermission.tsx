import { Modal, Form, Tree, message } from 'antd'
import React, { useEffect, useImperativeHandle, useRef, useState } from 'react'
import { IAction, IMenuModalProp, IModalProp } from '@/types/modal'
import { Menu } from '@/types/api'
import { useForm } from 'antd/es/form/Form'
import api from '@/api/api'
import roleApi from '@/api/roleApi'
import { Role } from '@/types/api'

export default function SetPermission(props: IModalProp<Role.RoleItem>) {
  const [checkedKeys, setCheckedKeys] = useState<string[]>([])
  const [menuList, setMenuList] = useState<Menu.MenuItem[]>([])
  const [visible, setVisible] = useState(false)
  const [roleInfo, setRoleInfo] = useState<Role.RoleItem>()
  const [permission, setPermission] = useState<Role.Permission>()

  useEffect(() => {
    getMenuList()
  }, [])

  const getMenuList = async () => {
    const menuList = await api.getMenuList()
    setMenuList(menuList)
  }

  //暴露组件方法
  useImperativeHandle(props.mRef, () => {
    return {
      open
    }
  })

  const open = (type: IAction, data?: Role.RoleItem) => {
    setVisible(true)
    setRoleInfo(data)
    setCheckedKeys(data?.permissionList.checkedKeys || [])
  }


  //取消
  const handleCancel = () => {
    setVisible(false)
    setPermission(undefined)
  }

  const onCheck = (checkedKeysValue: any, item: any) => {
    setCheckedKeys(checkedKeysValue)
    const checkedKeys: string[] = [];
    const parentKeys: string[] = [];
    item.checkNodes.forEach((node: Menu.MenuItem) => {
      if (node.menuType === 2) {
        checkedKeys.push(node._id)
      } else {
        parentKeys.push(node._id)
      }
    })
    setPermission({
      _id: roleInfo?._id || '',
      permissionList: {
        checkedKeys,
        halfCheckedKeys: parentKeys.concat(item.halfCheckedKeys || [])
      }
    })
  }

  const handleOk = async () => {
    if (permission) {
      await roleApi.updatePermission(permission)
      message.success('设置权限成功')
      handleCancel();
      props.update()
    }
  }

  return (
    <Modal
      title='设置权限'
      width={600}
      open={visible}
      okText='确认'
      onOk={handleOk}
      onCancel={handleCancel}
      cancelText='取消'
    >
      <Form labelAlign='right' labelCol={{ span: 4 }} wrapperCol={{ span: 16 }}>

        <Form.Item label='角色名称' rules={[{ required: true, message: '请输入角色名称' }]}>
         {roleInfo?.roleName}
        </Form.Item>
        <Form.Item label='权限'>

          <Tree
            fieldNames={{ title: 'menuName', key: "_id", children: "children" }}
            checkable
            defaultExpandAll={true}
            onCheck={onCheck}
            checkedKeys={checkedKeys}
            treeData={menuList}
          >

          </Tree>
        </Form.Item>
      </Form>
    </Modal>
  )
}


