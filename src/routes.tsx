import {BrowserRouter, Route, Routes} from 'react-router-dom'
import AdminLogin from './pages/AdminLogin'
import Homepage from './pages/Homepage'
import Login from './pages/Login'
import Main from './pages/Main'
import NewPassword from './pages/NewPassword'
import PageNotFound from './pages/PageNotFound'
import ResetPassword from './pages/ResetPassword'
import SignUp from './pages/SignUp'

export enum PATHS {
  MAIN = '/',
  LOGIN = '/login',
  ADMIN_LOGIN = '/login/admin',
  RESET_PASSWORD = '/reset/password',
  NEW_PASSWORD = '/reset/password/:token',
  HOMEPAGE = '/homepage',
  HOMEPAGE_REGISTRY_VISIT = '/homepage/:pictureId',
  SIGNUP = '/signup',
  PAGE_NOT_FOUND = '/page/not/found',
}

const Router: React.FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path={PATHS.MAIN} element={<Main />} />
        <Route path={PATHS.LOGIN} element={<Login />} />
        <Route path={PATHS.RESET_PASSWORD} element={<ResetPassword />} />
        <Route path={PATHS.NEW_PASSWORD} element={<NewPassword />} />
        <Route path={PATHS.ADMIN_LOGIN} element={<AdminLogin />} />
        <Route path={PATHS.SIGNUP} element={<SignUp />} />
        <Route path={PATHS.HOMEPAGE} element={<Homepage />} />
        <Route path={PATHS.HOMEPAGE_REGISTRY_VISIT} element={<Homepage />} />
        <Route path={PATHS.PAGE_NOT_FOUND} element={<PageNotFound />} />
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </BrowserRouter>
  )
}

export default Router
