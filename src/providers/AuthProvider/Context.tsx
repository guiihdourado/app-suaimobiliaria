import { createContext } from 'use-context-selector'

export interface IAuthContext {
  token: string | null
  isAuthenticated: boolean
  changeToken: (token: string) => void
  logout: () => void
}

const AuthContext = createContext<IAuthContext>({} as IAuthContext)

export { AuthContext }
