import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import { z } from 'zod'

import { getRestaurantApi, GetRestaurantBody } from '@/api/get-restaurant'
import { updateProfile } from '@/api/update-profile'

import { Button } from './ui/button'
import {
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from './ui/dialog'
import { Input } from './ui/input'
import { Label } from './ui/label'
import { Textarea } from './ui/textarea'

const storeProfileSchema = z.object({
  name: z.string().min(1),
  description: z.string(),
})

type StoreProfilType = z.infer<typeof storeProfileSchema>

export function StoreDialogProfile() {
  const queryClient = useQueryClient()

  const { data: restaurant } = useQuery({
    queryKey: ['restaurant'],
    queryFn: getRestaurantApi,
    staleTime: Infinity,
  })

  const { register, handleSubmit } = useForm<StoreProfilType>({
    resolver: zodResolver(storeProfileSchema),
    values: {
      name: restaurant?.name ?? '',
      description: restaurant?.description ?? '',
    },
  })

  const { mutateAsync: updateProfileFn } = useMutation({
    mutationFn: updateProfile,
    onSuccess(_, { name, description }) {
      const cached = queryClient.getQueryData<GetRestaurantBody>(['restaurant'])

      if (cached) {
        queryClient.setQueryData<GetRestaurantBody>(['restaurant'], {
          ...cached,
          name,
          description,
        })
      }
    },
  })

  async function handleUpdateProfile(data: StoreProfilType) {
    try {
      await updateProfileFn({ description: data.description, name: data.name })
      toast.success('Perfil atualizado com sucesso!')
    } catch (error) {
      console.log(error)
      toast.error('Ocorreu um erro ao atualizar o seu perfil. Tente novamente!')
    }
  }

  return (
    <DialogContent>
      <DialogHeader>
        <DialogTitle>Perfil da loja</DialogTitle>
        <DialogDescription>
          Atualize as informações do seu estabelecimento visíveis ao seu
          cliente.
        </DialogDescription>
      </DialogHeader>

      <form onSubmit={handleSubmit(handleUpdateProfile)}>
        <div className="space-y-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label className="text-right" htmlFor="name">
              Nome
            </Label>
            <Input className="col-span-3" id="name" {...register('name')} />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label className="text-right" htmlFor="description">
              Descrição
            </Label>
            <Textarea
              className="col-span-3"
              id="description"
              {...register('description')}
            />
          </div>
        </div>

        <DialogFooter>
          <Button variant="ghost" type="button">
            Cancelar
          </Button>
          <Button type="submit" variant="success">
            Salvar
          </Button>
        </DialogFooter>
      </form>
    </DialogContent>
  )
}
