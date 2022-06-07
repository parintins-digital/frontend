import React, {createContext, useState} from 'react'
import {User} from '../entities/User'
import {UserService} from '../services/UserService'

interface AuthProps {
  getAuthenticatedUser: () => User | undefined
  login: (email: string, password: string) => Promise<User | undefined>
  loginAsAdmin: (email: string, password: string) => Promise<User | undefined>
  logout: () => Promise<void>
  isAuthenticated: (saveUser?: boolean) => Promise<boolean>
  isAdmin: boolean
}

export const AuthContext = createContext<AuthProps>({} as AuthProps)

interface Props {
  children: React.ReactNode
}

const userService = new UserService()

const AuthenticationProvider: React.FC<Props> = ({children}: Props) => {
  const [isAdmin, setIsAdmin] = useState(false)

  function getAuthenticatedUser(): User | undefined {
    const user = userService.getAuthenticatedUser()
    return user
  }

  async function login(
    email: string,
    password: string
  ): Promise<User | undefined> {
    const user = await userService.login(email, password)
    return user
  }

  async function loginAsAdmin(
    email: string,
    password: string
  ): Promise<User | undefined> {
    const user = await userService.loginAsAdmin(email, password)
    if (user) {
      setIsAdmin(true)
    }
    return user
  }

  async function logout(): Promise<void> {
    await userService.logout()
  }

  async function isAuthenticated(saveUser = false): Promise<boolean> {
    const cookieExists = await userService.isAuthenticated(saveUser)
    const response = await userService.isAdmin()
    setIsAdmin(response)
    return cookieExists
  }

  return (
    <AuthContext.Provider
      value={{
        getAuthenticatedUser,
        login,
        logout,
        isAuthenticated,
        loginAsAdmin,
        isAdmin,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export default AuthenticationProvider
