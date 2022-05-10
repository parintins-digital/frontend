import {BrowserRouter, Route, Routes} from 'react-router-dom'
import Homepage from './pages/Homepage'
import Login from './pages/Login'
import SignUp from './pages/SignUp'

const Router: React.FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={<Login />}
        />
        <Route
          path="/signup"
          element={<SignUp />}
        />
        <Route
          path="/homepage"
          element={<Homepage />}
        />
      </Routes>
    </BrowserRouter>
  )
}

export default Router
