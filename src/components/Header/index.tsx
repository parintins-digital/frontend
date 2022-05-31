import LogoutIcon from '@mui/icons-material/Logout'
import {AppBar, Button, Toolbar} from '@mui/material'
import React from 'react'
import LogoImage from '../../assets/Logo-v2.png'
import {useCustomNavigate} from '../../hooks/useRedirect'
import {PATHS} from '../../routes'
import {UserService} from '../../services/UserService'

const userService = new UserService()

const Header: React.FC = () => {
  const {navigateTo, createHandler} = useCustomNavigate()

  function handleLogout() {
    userService.logout()
    navigateTo(PATHS.MAIN)
  }

  return (
    <AppBar
      color="secondary"
      sx={{
        zIndex: 1,
        boxShadow: 1,
      }}
    >
      <Toolbar>
        <img
          src={LogoImage}
          alt="Logo"
          onClick={createHandler(PATHS.MAIN)}
          style={{
            width: '100px',
            height: 'auto',
            cursor: 'pointer',
          }}
        />
        <Button
          variant="contained"
          color="primary"
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
