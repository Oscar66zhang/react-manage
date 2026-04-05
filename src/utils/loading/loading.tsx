import { Spin } from 'antd'
import './loading.less'

export const Loading = () => {
  return <Spin description='Loading' size='large' className='request-loading' />
}
