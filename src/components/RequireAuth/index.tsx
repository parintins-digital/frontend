import {Navigate, Outlet, useLocation} from 'react-router-dom'
import {useAuth} from '../../hooks/useAuth'
import {PATHS} from '../../routes'

const RequireAuth: React.FC = () => {
  const {isAuthenticated} = useAuth()
  const location = useLocation()

  console.log(isAuthenticated)

  if (isAuthenticated) {
    return <Outlet />
  } else {
    return <Navigate to={PATHS.LOGIN} state={{from: location}} replace />
  }
}

export default RequireAuth
