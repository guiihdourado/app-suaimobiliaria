import React, { useCallback, useState } from 'react'
import { useRouter } from 'next/router'
import { getCookie, deleteCookie, setCookie } from 'cookies-next'

import { api } from '@/services/api'

import { AuthContext, Login, UserData } from './Context'

interface AuthProviderProps {
  children: React.ReactNode
}

type Data = {
  user: UserData
  token: string
}

const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const router = useRouter()

  const [data, setData] = useState<Data | null>(() => {
    const cookieUser = getCookie('user') as string
    const cookieToken = getCookie('token') as string

    if (cookieToken && cookieUser) {
      api.defaults.headers.authorization = `Bearer ${cookieToken}`

      return {
        token: cookieToken,
        user: JSON.parse(cookieUser),
      }
    }

    return null
  })

  const [isLogged, setIsLogged] = useState(() => {
    const cookieToken = getCookie('token')
    return !!cookieToken
  })

  const login = useCallback(
    ({ userData, token }: Login) => {
      setCookie('token', token)
      setCookie('user', JSON.stringify(userData))

      api.defaults.headers.authorization = `Bearer ${token}`

      setData({
        token,
        user: userData,
      })

      setIsLogged(true)

      router.push(`/`)
    },
    [router],
  )

  const logout = useCallback(() => {
    deleteCookie('token')
    deleteCookie('user')
    setIsLogged(false)

    router.push(`/login`)
  }, [router])

  return (
    <AuthContext.Provider
      value={{
        user: data?.user || null,
        isAuthenticated: isLogged,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export { AuthProvider }
