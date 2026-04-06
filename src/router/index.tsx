import { useRoutes, Navigate } from 'react-router-dom'
import { Login } from '@/views/login/Login'
import { Welcome } from '@/views/Welcome'
import { NotFound } from '@/views/404'
import { Forbidden } from '@/views/403'

const routes = [
  {
    path: '/',
    element: <Welcome />
  },
  {
    path: '/login',
    element: <Login />
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
