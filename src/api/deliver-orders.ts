import { api } from '@/lib/axios'

interface DeliveryOrderRequest {
  orderId: string
}

export async function deliverOrder({ orderId }: DeliveryOrderRequest) {
  await api.patch(`/orders/${orderId}/deliver`)
}
