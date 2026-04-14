import { MenuFoldOutlined } from '@ant-design/icons'
import { Breadcrumb, Switch, Dropdown } from 'antd'
import type { MenuProps } from 'antd'
import styles from './index.module.less'
import storage from '@/utils/storage'
import store from '@/store'

const NavHeader = () => {
  const userInfo = store(state => state.userInfo)
  const breadList = [
    {
      key: 'home',
      title: <span style={{ color: '#000' }}>首页</span>
    },
    {
      key: 'work',
      title: <span style={{ color: '#000' }}>工作台</span>
    }
  ]

  const items: MenuProps['items'] = [
    {
      key: 'email',
      label: '邮箱:' + userInfo.userEmail
    },
    {
      key: 'logout',
      label: '退出'
    }
  ]

  const onClick: MenuProps['onClick'] = ({ key }) => {
    if (key === 'logout') {
      storage.remove('token')
      location.href = '/login?callback=' + encodeURIComponent(location.href)
    }
  }

  return (
    <div className={styles.navHeader} style={{ color: '#000' }}>
      <div className={styles.left} style={{ color: '#000' }}>
        <MenuFoldOutlined />
        <Breadcrumb items={breadList} style={{ marginLeft: 10 }} />
      </div>
      <div className={styles.right}>
        <Switch checkedChildren='暗黑' unCheckedChildren='默认' />
        <Dropdown menu={{ items, onClick }} trigger={['click']}>
          <span className={styles.nickName}>{userInfo.userName}</span>
        </Dropdown>
      </div>
    </div>
  )
}

export default NavHeader
