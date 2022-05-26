import {useContext} from 'react'
import {AuthContext} from '../contexts/Authentication'

export function useAuth() {
  const {getAuthenticatedUser, login, logout} = useContext(AuthContext)
  // const isAuthenticated = !!getAuthenticatedUser()
  const isAuthenticated = true // tmp code. Remove after receive the user and create a local user.
  return {
    getAuthenticatedUser,
    login,
    logout,
    isAuthenticated,
  }
}
