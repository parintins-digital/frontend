import React, {createContext} from 'react'
import {User} from '../entities/User'
import {UserService} from '../services/UserService'

interface AuthProps {
  getAuthenticatedUser: () => User | undefined
  login: (email: string, password: string) => Promise<User>
  loginAsAdmin: (email: string, password: string) => Promise<User>
  logout: () => void
  isAuthenticated: () => Promise<boolean>
}

export const AuthContext = createContext<AuthProps>({} as AuthProps)

interface Props {
  children: React.ReactNode
}

const userService = new UserService()

const AuthenticationProvider: React.FC<Props> = ({children}: Props) => {
  function getAuthenticatedUser(): User | undefined {
    const user = userService.getAuthenticatedUser()
    return user
  }

  async function login(email: string, password: string): Promise<User> {
    const user = await userService.login(email, password)
    return user
  }

  async function loginAsAdmin(email: string, password: string): Promise<User> {
    const user = await userService.loginAsAdmin(email, password)
    return user
  }

  function logout() {
    userService.logout()
  }

  async function isAuthenticated() {
    return true
    // const cookieExists = await userService.isAuthenticated()
    // return cookieExists
  }

  return (
    <AuthContext.Provider
      value={{
        getAuthenticatedUser,
        login,
        logout,
        isAuthenticated,
        loginAsAdmin,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export default AuthenticationProvider
