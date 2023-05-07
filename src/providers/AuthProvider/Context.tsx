import { createContext } from 'use-context-selector'

export type UserData = {
  name: string
  email: string
  tenantId: string
}

export type Login = {
  userData: UserData
  token: string
}

export interface IAuthContext {
  user: UserData | null
  isAuthenticated: boolean
  login: (data: Login) => void
  logout: () => void
}

const AuthContext = createContext<IAuthContext>({} as IAuthContext)

export { AuthContext }
