import React, { useEffect } from 'react'
import styles from './index.module.less'
import { Layout, theme } from 'antd'
import { Watermark } from 'antd'
import NavHeader from '@/components/NavHeader'
import NavFooter from '@/components/NavFooter'
import Menu from '@/components/Menu'
import { Outlet, useRouteLoaderData } from 'react-router-dom'
import api from '@/api/api'
// import storage from '@/utils/storage'
import store from '@/store'

const { Header, Content, Sider, Footer } = Layout

const App: React.FC = () => {
  const { collapsed, updateUserInfo } = store()
  useEffect(() => {
    getUserInfo()
  }, [])

  const getUserInfo = async () => {
    const data = await api.getUserInfo()
    updateUserInfo(data)
  }

  const {
    token: { colorBgContainer }
  } = theme.useToken()


 const data = useRouteLoaderData('layout')
 console.log(data)

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
