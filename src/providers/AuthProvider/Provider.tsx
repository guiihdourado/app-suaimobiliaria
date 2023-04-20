import React, { useCallback, useState } from 'react'
import { useRouter } from 'next/router'
import { getCookie, deleteCookie, setCookie } from 'cookies-next'

import { AuthContext } from './Context'

interface AuthProviderProps {
  children: React.ReactNode
}

const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const router = useRouter()

  const [token, setToken] = useState(() => {
    const cookieToken = getCookie('token') as string
    return cookieToken || null
  })

  const [isLogged, setIsLogged] = useState(() => {
    const cookieToken = getCookie('token')
    return !!cookieToken
  })

  const changeToken = useCallback((token: string) => {
    setCookie('token', token)
    setToken(token)
    setIsLogged(!!token)
  }, [])

  const logout = useCallback(() => {
    deleteCookie('token')
    setIsLogged(false)

    router.push(`/login`)
  }, [router])

  return (
    <AuthContext.Provider
      value={{
        token,
        isAuthenticated: isLogged,
        changeToken,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export { AuthProvider }
