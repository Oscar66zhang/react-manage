import { useNavigate } from 'react-router-dom'
import { Button, Result } from 'antd'

export const Forbidden = () => {
  const navigate = useNavigate()
  const handleClick = () => {
    navigate('/')
  }
  return (
    <Result
      status='403'
      title='403'
      subTitle='Sorry, you are not allowed to access this page.'
      extra={
        <Button type='primary' onClick={handleClick}>
          Back Home
        </Button>
      }
    />
  )
}
