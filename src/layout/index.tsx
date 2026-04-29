import React, { useEffect } from 'react'
import styles from './index.module.less'
import { Layout, theme } from 'antd'
import { Watermark } from 'antd'
import NavHeader from '@/components/NavHeader'
import NavFooter from '@/components/NavFooter'
import Menu from '@/components/Menu'
import { Outlet, useRouteLoaderData, useLocation, Navigate } from 'react-router-dom'
import api from '@/api/api'
// import storage from '@/utils/storage'
import { routes } from '@/router'
import useStore from '@/store'
import { IAuthLoader } from '@/router/AuthLoader'
import { searchRoute } from '@/utils'



const { Header, Content, Sider, Footer } = Layout

const App: React.FC = () => {
  const { collapsed, userInfo, updateUserInfo } = useStore()
  const {
    token: { colorBgContainer }
  } = theme.useToken()
  const { pathname } = useLocation()
  useEffect(() => {
    getUserInfo()
  }, [])
  const getUserInfo = async () => {
    const data = await api.getUserInfo()
    updateUserInfo(data)
  }
  // 权限判断
  const data = useRouteLoaderData('layout') as IAuthLoader
  console.log('loader data:', data);
  const route = searchRoute(pathname, routes)
  if (route && route.meta?.auth === false) {
    // 继续执行
  } else {
    const staticPath = ['/welcome', '/403', '/404']
    if (!data.menuPathList.includes(pathname) && !staticPath.includes(pathname)) {
      return <Navigate to='/403' />
    }
  }






  return (
    <Watermark content='React'>
      <Layout style={{ height: '100vh' }}>
        <Sider collapsed={collapsed}>
          <Menu />
        </Sider>
        <Layout>
          <Header
            style={{
              padding: 0,
              height: '50px',
              lineHeight: '50px',
              background: colorBgContainer,
              display: 'flex',
              alignItems: 'center'
            }}
          >
            <NavHeader />
          </Header>
          <Content id='content' className={styles.content}>
            <div className={styles.wrapper}>
              <Outlet />
            </div>
            <Footer>
              <NavFooter />
            </Footer>
          </Content>
        </Layout>
      </Layout>
    </Watermark>
  )
}

export default App
