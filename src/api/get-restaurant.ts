import { api } from '@/lib/axios'

export interface GetRestaurantBody {
  id: string
  name: string
  createdAt: Date | null
  updatedAt: Date | null
  description: string | null
  managerId: string | null
}

export async function getRestaurantApi() {
  const response = await api.get<GetRestaurantBody>('/managed-restaurant')

  return response.data
}
