import {BrowserRouter, Route, Routes} from 'react-router-dom'
import AdminLogin from './pages/AdminLogin'
import Homepage from './pages/Homepage'
import Login from './pages/Login'
import Main from './pages/Main'
import SignUp from './pages/SignUp'

export enum PATHS {
  MAIN = '/',
  LOGIN = '/login',
  ADMIN_LOGIN = '/login/admin',
  HOMEPAGE = '/homepage',
  HOMEPAGE_REGISTRY_VISIT = '/homepage/:pictureId',
  SIGNUP = '/signup',
}

const Router: React.FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path={PATHS.MAIN} element={<Main />} />
        <Route path={PATHS.LOGIN} element={<Login />} />
        <Route path={PATHS.ADMIN_LOGIN} element={<AdminLogin />} />
        <Route path={PATHS.SIGNUP} element={<SignUp />} />
        <Route path={PATHS.HOMEPAGE} element={<Homepage />} />
        <Route path={PATHS.HOMEPAGE_REGISTRY_VISIT} element={<Homepage />} />
      </Routes>
    </BrowserRouter>
  )
}

export default Router
