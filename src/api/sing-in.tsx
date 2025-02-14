import { api } from '@/lib/axios'

export interface SingInBody {
  email: string
}

export async function SingInApi({ email }: SingInBody) {
  await api.post('/authenticate', { email })
}
