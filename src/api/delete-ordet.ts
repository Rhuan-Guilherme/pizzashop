import { api } from '@/lib/axios'

interface DeleteOrderRequest {
  orderId: string
}

export async function deleteOrder({ orderId }: DeleteOrderRequest) {
  await api.patch(`/orders/${orderId}/cancel`)
}
