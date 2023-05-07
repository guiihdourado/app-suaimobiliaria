import { useContextSelector } from 'use-context-selector'
import { AuthContext, IAuthContext } from '../Context'

type UseAuthProps = Pick<
  IAuthContext,
  'user' | 'login' | 'logout' | 'isAuthenticated'
>

const useAuth = (): UseAuthProps => {
  const user = useContextSelector(AuthContext, (state) => state.user)
  const login = useContextSelector(AuthContext, (state) => state.login)
  const logout = useContextSelector(AuthContext, (state) => state.logout)
  const isAuthenticated = useContextSelector(
    AuthContext,
    (state) => state.isAuthenticated,
  )

  return {
    user,
    login,
    logout,
    isAuthenticated,
  }
}

export { useAuth }
