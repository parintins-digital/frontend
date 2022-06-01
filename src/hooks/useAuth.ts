import {useContext} from 'react'
import {AuthContext} from '../contexts/Authentication'
import {useLoading} from './useLoading'

export function useAuth() {
  const {
    getAuthenticatedUser,
    login,
    loginAsAdmin,
    logout,
    isAuthenticated,
    isAdmin,
  } = useContext(AuthContext)
  const handleLogin = useLoading(
    login,
    'Realizando o Login. Aguarde um momento...',
    false
  )
  const handleLoginAsAdmin = useLoading(
    loginAsAdmin,
    'Realizando o Login. Aguarde um momento...',
    false
  )
  const handleLogout = useLoading(
    logout,
    'Realizando o Logout. Aguarde um momento...'
  )
  return {
    getAuthenticatedUser,
    login: handleLogin,
    loginAsAdmin: handleLoginAsAdmin,
    logout: handleLogout,
    isAuthenticated,
    isAdmin,
  }
}
