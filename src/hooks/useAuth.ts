import {useContext} from 'react'
import {AuthContext} from '../contexts/Authentication'

export function useAuth() {
  const {getAuthenticatedUser, login, loginAsAdmin, logout, isAuthenticated} =
    useContext(AuthContext)
  return {
    getAuthenticatedUser,
    login,
    loginAsAdmin,
    logout,
    isAuthenticated,
  }
}
