import { createBrowserRouter } from 'react-router-dom'

import { AppLayout } from './pages/_layouts/app'
import { AuthLayout } from './pages/_layouts/auth'
import { Dashboard } from './pages/app/dashboard'
import { Orders } from './pages/app/orders/order'
import { SingIn } from './pages/auth/sing-in'
import { SingUp } from './pages/auth/sing-up'

export const router = createBrowserRouter([
  {
    path: '/',
    element: <AppLayout />,
    children: [
      {
        path: '/',
        element: <Dashboard />,
      },
      {
        path: '/orders',
        element: <Orders />,
      },
    ],
  },

  {
    path: '/',
    element: <AuthLayout />,
    children: [
      {
        path: '/sing-in',
        element: <SingIn />,
      },
      {
        path: '/sing-up',
        element: <SingUp />,
      },
    ],
  },
])
