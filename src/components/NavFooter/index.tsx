import styles from './index.module.css'

const NavFooter = () => {
  return (
    <div className={styles.footer}>
      <div>
        <a href='https://www.imooc.com/u/1343480' target='_blank' rel='noopener noreferrer'>
          Oscar Zhang 主页
        </a>
        <span className='gutter'> | </span>

        <a href='https://coding.imooc.com/class/644.html' target='_blank' rel='noopener noreferrer'>
          React 18 管理系统
        </a>
        <span className='gutter'> | </span>

        <a href='https://coding.imooc.com/class/502.html' target='_blank' rel='noopener noreferrer'>
          Vue 3 全栈开发实战
        </a>
        <span className='gutter'> | </span>

        <a href='https://coding.imooc.com/class/397.html' target='_blank' rel='noopener noreferrer'>
          Vue 商城项目实战
        </a>
      </div>

      <div style={{ marginTop: 8 }}>Copyright ©2023 React18通用后台课程 All Rights Reserved.</div>
    </div>
  )
}

export default NavFooter
