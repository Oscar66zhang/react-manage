import { createBrowserRouter, Navigate } from 'react-router-dom'
import { Login } from '@/views/login/Login'
import { Welcome } from '@/views/welcome'
import User from '@/views/system/user'
import Dept from '@/views/system/dep'
import Menu from '@/views/system/menu'
import Role from '@/views/system/role'
import { NotFound } from '@/views/404'
import { Forbidden } from '@/views/403'
import Layout from '@/layout'
import DashBoard from '@/views/dashboard'
import AuthLoader from './AuthLoader'

export const routes = [
  {
    path: '/',
    element: <Navigate to='/welcome' />
  },
  {
    path: '/login',
    element: <Login />
  },
  {
    id: 'layout',
    loader: AuthLoader,
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
      },
      {
        path: '/deptList',
        element: <Dept />
      },
      {
        path: '/menuList',
        element: <Menu />,
        meta: {
          auth: false
        }
      },
      {
        path: '/roleList',
        element: <Role />,
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

//useRoutes: export default function Router() {
//   return useRoutes(routes)
// }

// createBrowserRouter：
export default createBrowserRouter(routes)
