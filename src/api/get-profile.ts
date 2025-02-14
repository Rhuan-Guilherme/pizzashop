import { api } from '@/lib/axios'

export interface GetProfileBody {
  id: string
  role: 'manager' | 'customer'
  email: string
  name: string
  phone: string | null
  createdAt: Date | null
  updatedAt: Date | null
}

export async function getProfileApi() {
  const response = await api.get<GetProfileBody>('/me')

  return response.data
}
