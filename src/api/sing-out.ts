import { api } from '@/lib/axios'

export async function singOut() {
  await api.post('/sign-out')
}
