import { Menu } from 'antd'
import { DesktopOutlined, SettingOutlined, TeamOutlined } from '@ant-design/icons'
import styles from './index.module.less'
import { useNavigate } from 'react-router-dom'
const SideMenu = () => {
  const navigate = useNavigate()
  const items = [
    {
      label: '工作台',
      key: '1',
      icon: <DesktopOutlined />,
      path: '/dashboard'
    },
    {
      label: '系统管理',
      key: '2',
      icon: <SettingOutlined />,
      children: [
        {
          label: '用户管理',
          key: '3',
          icon: <TeamOutlined />,
          path: '/userList'
        }
      ]
    }
  ]

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
        defaultSelectedKeys={['1']}
        mode='inline'
        theme='dark'
        style={{
          height: '100%',
          overflow: 'auto',
          flex: 1
        }}
        items={items}
      />
    </div>
  )
}

export default SideMenu
