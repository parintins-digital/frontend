import {AppBar, Button, Toolbar} from '@mui/material'
import React from 'react'
import LogoutIcon from '@mui/icons-material/Logout'
import LogoImage from '../../assets/Logo-v2.png'
import {useNavigate} from 'react-router-dom'
import {PATHS} from '../../routes'
import {UserService} from '../../services/UserService'

const userService = new UserService()

const Header: React.FC = () => {
  const navigate = useNavigate()

  function handleLogout() {
    userService.logout()
    navigate(PATHS.LOGIN)
  }

  function handleLogoClick() {
    navigate(PATHS.LOGIN)
  }

  return (
    <AppBar
      sx={{
        zIndex: 1,
      }}
    >
      <Toolbar>
        <img
          src={LogoImage}
          alt="Logo"
          onClick={handleLogoClick}
          style={{
            width: '100px',
            height: 'auto',
            cursor: 'pointer',
          }}
        />
        <Button
          variant="contained"
          color="secondary"
          onClick={handleLogout}
          startIcon={<LogoutIcon />}
          sx={{
            marginLeft: 'auto',
          }}
        >
          Sair
        </Button>
      </Toolbar>
    </AppBar>
  )
}

export default Header
