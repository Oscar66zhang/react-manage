import React from 'react'
import { Menu } from 'antd'
import styles from './index.module.less'
import { useNavigate, useRouteLoaderData } from 'react-router-dom'
import type { MenuProps, MenuTheme } from 'antd';
import { useEffect, useState } from 'react'
import type { Menu as IMenu } from '@/types/api'
import * as Icons from '@ant-design/icons'
import { useLocation } from 'react-router-dom'

const SideMenu = () => {
  const [treeMenuList, setTreeMenuList] = useState<MenuItem[]>([])
  const data: any = useRouteLoaderData('layout')
  const navigate = useNavigate()
  type MenuItem = Required<MenuProps>['items'][number];
  const [selectedKeys, setSelectedKeys] = useState<string[]>([])

  const { pathname } = useLocation()

  //生成每一个菜单项
  function getItem(
    label: React.ReactNode,
    key?: React.Key | null,
    icon?: React.ReactNode,
    children?: MenuItem[]
  ): MenuItem {
    return {
      label,
      key,
      icon,
      children
    } as MenuItem
  }

  const createIcon = (name?: string) => {
    if (!name) return <></>
    const customIcons: { [key: string]: any } = Icons
    const icon = customIcons[name]
    if (!icon) return <></>
    return React.createElement(icon)
  }

  //递归生成菜单
  const getTreeMenu = (menuList: IMenu.MenuItem[], treeList: MenuItem[] = []) => {
    menuList.forEach((item, index) => {
      if (item.menuType === 1 && item.menuState === 1) {
        if (item.buttons) return treeList.push(getItem(item.menuName, item.path || index, createIcon(item.icon)))
        if (item.path) {
          treeList.push(getItem(item.menuName, item.path, createIcon(item.icon)))
        } else {
          treeList.push(
            getItem(item.menuName, item._id, createIcon(item.icon), getTreeMenu(item.children || []))
          )
        }
      }
    })
    return treeList
  }
  //菜单点击
  const handleClickMenu: MenuProps['onClick'] = ({ key }: { key: string }) => {
    setSelectedKeys([key])
    navigate(key)
  }

  //初始化获取接口菜单列表数据
  useEffect(() => {
    const treeMenuList = getTreeMenu(data.menuList, [])
    console.log("打印菜单列表",treeMenuList);
    console.log("打印路径",pathname);
    
    setTreeMenuList(treeMenuList)
    setSelectedKeys([pathname])
  }, [data])


  //Logo点击
  const handleClickLogo = () => {
    navigate('/welcome')
  }

  return (
    <div style={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
      <div className={styles.logo} onClick={handleClickLogo}>
        <img src='/images/logo.png' alt='' className={styles.img} />
        <span>幕幕货运</span>
      </div>
      <Menu
        onClick={handleClickMenu}
        triggerSubMenuAction='click'
        mode='inline'
        theme='dark'
        style={{
          height: '100%',
          overflow: 'auto',
          flex: 1
        }}
        selectedKeys={selectedKeys}
        items={treeMenuList}
      
      />
    </div>
  )
}

export default SideMenu
