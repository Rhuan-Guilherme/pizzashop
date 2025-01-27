import { zodResolver } from '@hookform/resolvers/zod'
import { Helmet } from 'react-helmet-async'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import z from 'zod'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

const singInForm = z.object({
  email: z.string().email('Insira um e-mail válido.'),
})

type SingInForm = z.infer<typeof singInForm>

export function SingIn() {
  const {
    register,
    handleSubmit,
    formState: { isSubmitting, errors },
  } = useForm<SingInForm>({
    resolver: zodResolver(singInForm),
  })

  async function handleSingIn(data: SingInForm) {
    console.log(data)

    await new Promise((resolve) => setTimeout(resolve, 2000))
    toast.success('Enviamos um link de autenticação para seu e-mail.', {
      action: {
        label: 'Reenviar',
        onClick: () => handleSingIn(data),
      },
    })
  }

  return (
    <>
      <Helmet title="Login" />
      <div className="p-8">
        <div className="flex w-[350px] flex-col justify-center gap-6">
          <div className="flex flex-col gap-2 text-center">
            <h1 className="text-2xl font-semibold tracking-tight">
              Acessar painel
            </h1>
            <p className="text-sm text-muted-foreground">
              Acompanhe suas vendas pelo painel do parceiro
            </p>
          </div>

          <form className="space-y-4" onSubmit={handleSubmit(handleSingIn)}>
            <div className="space-y-2">
              <Label htmlFor="email">Seu e-mail</Label>
              <Input type="email" id="email" {...register('email')} />
            </div>

            <Button disabled={isSubmitting} className="w-full" type="submit">
              Acessar painel
            </Button>
            {errors && (
              <p className="text-red-500 dark:text-red-400">
                {errors.email?.message}
              </p>
            )}
          </form>
        </div>
      </div>
    </>
  )
}
