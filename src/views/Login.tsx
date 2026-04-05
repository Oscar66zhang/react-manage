import { useEffect } from 'react'
import request from '@/utils/request'
export const Login = () => {
  useEffect(() => {
    request
      .post<string>('/users', {
        id: 12345
      })
      .then(res => {
        const token = res
      })
      .catch(error => {
        console.error('请求失败:', error)
      })
  }, [])
  return <div>Login</div>
}
