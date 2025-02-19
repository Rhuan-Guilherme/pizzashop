import { api } from '@/lib/axios'

interface GetOrdersDetailParams {
  orderId: string
}

interface GetOrdersDetailResponse {
  status: 'pending' | 'canceled' | 'processing' | 'delivering' | 'delivered'
  id: string
  createdAt: string
  totalInCents: number
  customer: {
    name: string
    email: string
    phone: string | null
  }
  orderItems: {
    id: string
    priceInCents: number
    quantity: number
    product: {
      name: string
    }
  }[]
}

export async function getOrdersDatails({ orderId }: GetOrdersDetailParams) {
  const response = await api.get<GetOrdersDetailResponse>(`/orders/${orderId}`)

  return response.data
}
