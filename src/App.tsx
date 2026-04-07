import { BrowserRouter } from 'react-router-dom'
import { ConfigProvider, App as AntdApp } from 'antd'
import Router from './router'
import './App.css'
import AntdGlobal from './utils/AntdGlobal'

const App = () => {
  return (
    <ConfigProvider
      theme={{
        token: {
          colorPrimary: '#eb6c00'
        }
      }}
    >
      <AntdApp>
        <AntdGlobal />
        <BrowserRouter>
          <Router />
        </BrowserRouter>
      </AntdApp>
    </ConfigProvider>
  )
  // return <RouterProvider router={router}/>
}

export default App
