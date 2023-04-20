import Image from 'next/image'
import { useRouter } from 'next/router'

import * as yup from 'yup'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'

import { api } from '@/services/api'
import { useAuth } from '@/providers/AuthProvider'
import { Input, Button } from '@/components'

import logo from '@/assets/logo.svg'
import { useState } from 'react'

const schema = yup.object().shape({
  email: yup
    .string()
    .email('Deve ser um email válido.')
    .required('Email obrigatório'),
  password: yup.string().required('Senha obrigatória'),
})

type LoginForm = yup.InferType<typeof schema>

type SessionsResponse = {
  token: string
  user: {
    email: string
    name: string
  }
}

export default function Login() {
  const router = useRouter()

  const { changeToken } = useAuth()

  const { register, handleSubmit, formState } = useForm<LoginForm>({
    resolver: yupResolver(schema),
  })

  const [isLoading, setIsLoading] = useState(false)

  return (
    <div className="flex items-center justify-center w-screen h-screen bg-gray-200">
      <div className="flex bg-white flex-col w-[32rem] p-12 gap-8">
        <div className="flex items-center justify-center flex-col">
          <Image src={logo} alt="Logo" className="w-72" />
          <span className="text-gray-500 font-medium mt-4">
            Entre na sua conta
          </span>
        </div>
        <form
          className="flex flex-col gap-8"
          onSubmit={handleSubmit(({ email, password }) => {
            setIsLoading(true)
            api
              .post<SessionsResponse>('/sessions', {
                email,
                password,
              })
              .then(({ data }) => {
                changeToken(data.token)

                router.push(`/`)
              })
              .catch(() => {
                alert('Erro ao fazer login')
              })
              .finally(() => setIsLoading(false))
          })}
        >
          <div className="flex flex-col w-full gap-4">
            <Input
              label="Email"
              errorMessage={formState.errors?.email?.message}
              {...register('email')}
            />
            <Input
              label="Senha"
              errorMessage={formState.errors?.password?.message}
              type="password"
              {...register('password')}
            />
          </div>

          <Button isLoading={isLoading}>Entrar</Button>
        </form>
      </div>
    </div>
  )
}
