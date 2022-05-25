import {BrowserRouter, Route, Routes} from 'react-router-dom'
import Homepage from './pages/Homepage'
import Login from './pages/Login'
import SignUp from './pages/SignUp'

export enum PATHS {
  LOGIN = '/',
  HOMEPAGE = '/homepage',
  SIGNUP = '/signup',
}

const Router: React.FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path={PATHS.LOGIN} element={<Login />} />
        <Route path={PATHS.SIGNUP} element={<SignUp />} />
        <Route path={PATHS.HOMEPAGE} element={<Homepage />} />
      </Routes>
    </BrowserRouter>
  )
}

export default Router
