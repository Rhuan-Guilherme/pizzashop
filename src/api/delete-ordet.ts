import { api } from '@/lib/axios'

interface DeleteUserParams {
  orderId: string
}

export async function deleteOrder({ orderId }: DeleteUserParams) {
  await api.patch(`/orders/${orderId}/cancel`)
}
