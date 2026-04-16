import { useRoutes, Navigate } from 'react-router-dom'
import { Login } from '@/views/login/Login'
import { Welcome } from '@/views/welcome'
import User from '@/views/system/user'
import { NotFound } from '@/views/404'
import { Forbidden } from '@/views/403'
import Layout from '@/layout'
import DashBoard from '@/views/dashboard'

const routes = [
  {
    path: '/',
    element: <Navigate to='/welcome' />
  },
  {
    path: '/login',
    element: <Login />
  },
  {
    element: <Layout />,
    children: [
      {
        path: '/welcome',
        element: <Welcome />
      },
      {
        path: '/dashboard',
        element: <DashBoard />
      },
      {
        path: '/userList',
        element: <User />
      }
    ]
  },
  {
    path: '*',
    element: <Navigate to='/404' />
  },
  {
    path: '/404',
    element: <NotFound />
  },
  {
    path: '/403',
    element: <Forbidden />
  }
]

export default function Router() {
  return useRoutes(routes)
}

//createBrowserRouter： export default createBrowserRouter(routes)
