import LogoutIcon from '@mui/icons-material/Logout'
import {AppBar, Button, Toolbar} from '@mui/material'
import React from 'react'
import LogoImage from '../../assets/Logo-v2.png'
import {useAuth} from '../../hooks/useAuth'
import {useCustomNavigate} from '../../hooks/useRedirect'
import {PATHS} from '../../routes'
import {UserService} from '../../services/UserService'

const userService = new UserService()

const Header: React.FC = () => {
  const {isAdmin} = useAuth()
  const {navigateTo, createHandler} = useCustomNavigate()

  function handleLogout() {
    userService.logout()
    navigateTo(PATHS.MAIN)
  }

  return (
    <AppBar
      color={isAdmin ? 'primary' : 'secondary'}
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
          color={isAdmin ? 'secondary' : 'primary'}
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
