import { isAxiosError } from 'axios'
import { useEffect } from 'react'
import { Outlet, useNavigate } from 'react-router-dom'

import { Header } from '@/components/Header'
import { api } from '@/lib/axios'

export function AppLayout() {
  const navvigate = useNavigate()

  useEffect(() => {
    const interceptorId = api.interceptors.response.use(
      (reponse) => reponse,
      (error) => {
        if (isAxiosError(error)) {
          const status = error.response?.status
          const code = error.response?.data.code

          if (status === 401 && code === 'UNAUTHORIZED') {
            navvigate('/sing-in', { replace: true })
          }
        }
      },
    )

    return () => {
      api.interceptors.request.eject(interceptorId)
    }
  }, [navvigate])

  return (
    <div className="flex min-h-screen flex-col antialiased">
      <Header />

      <div className="flex flex-1 flex-col gap-4 p-8 pt-6">
        <Outlet />
      </div>
    </div>
  )
}
