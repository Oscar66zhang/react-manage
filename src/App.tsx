import { RouterProvider } from 'react-router-dom'
import { ConfigProvider, App as AntdApp } from 'antd'
import router from './router'
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
        <RouterProvider router={router} />
      </AntdApp>
    </ConfigProvider>
  )
  // return <RouterProvider router={router}/>

  // <BrowserRouter>
  //     <Router />
  //   </BrowserRouter>
}

export default App
