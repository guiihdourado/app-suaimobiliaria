import { useContextSelector } from 'use-context-selector'
import { AuthContext, IAuthContext } from '../Context'

type UseAuthProps = Pick<
  IAuthContext,
  'token' | 'changeToken' | 'logout' | 'isAuthenticated'
>

const useAuth = (): UseAuthProps => {
  const token = useContextSelector(AuthContext, (state) => state.token)
  const changeToken = useContextSelector(
    AuthContext,
    (state) => state.changeToken,
  )
  const logout = useContextSelector(AuthContext, (state) => state.logout)
  const isAuthenticated = useContextSelector(
    AuthContext,
    (state) => state.isAuthenticated,
  )

  return {
    token,
    changeToken,
    logout,
    isAuthenticated,
  }
}

export { useAuth }
