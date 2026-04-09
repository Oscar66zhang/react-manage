import request from '@/utils/request'
import { Button } from 'antd'
import storage from '@/utils/storage'
// import { formatMoney, fomratDate, formatNum } from '@/utils'
export const Welcome = () => {
  const handleClick = () => {
    request.post<string>('/users/login', {})
  }

  const handleStorage = (type: number) => {
    if (type === 1) {
      storage.set('age', 30)
      storage.set('user', { name: 'jack', gender: '1' })
    }
    if (type === 2) {
      console.log(localStorage.getItem('age'))
      console.log(localStorage.getItem('user'))
    }
    if (type === 3) {
      console.log(localStorage.removeItem('age'))
    }
    if (type == 4) {
      storage.clear()
    }
  }

  return (
    <div className='welcome'>
      <h2>Welcome</h2>
      <p>
        <Button onClick={handleClick}>点击事件</Button>
        <Button onClick={() => handleStorage(1)}>写入值</Button>
        <Button onClick={() => handleStorage(2)}>读取值</Button>
        <Button onClick={() => handleStorage(3)}>删除值</Button>
        <Button onClick={() => handleStorage(4)}>清空所有</Button>
      </p>
    </div>
  )
}
