import Image from 'next/image'

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
    tenantId: string
  }
}

export default function Login() {
  const { login } = useAuth()

  const { register, handleSubmit, formState } = useForm<LoginForm>({
    resolver: yupResolver(schema),
  })

  const [isLoading, setIsLoading] = useState(false)

  return (
    <div className="flex items-center justify-center w-screen h-screen bg-[#F3F7F8]">
      <div className="flex bg-white flex-col w-[32rem] p-12 gap-8 rounded-xl shadow-xl">
        <div className="flex items-center justify-center flex-col">
          <Image src={logo} alt="Logo" className="w-72" />
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
                login({
                  token: data.token,
                  userData: data.user,
                })
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
