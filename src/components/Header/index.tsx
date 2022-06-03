import LogoutIcon from '@mui/icons-material/Logout'
import {AppBar, Button, Toolbar} from '@mui/material'
import React from 'react'
import LogoImage from '../../assets/Logo-v2.png'
import {useAuth} from '../../hooks/useAuth'
import {useLoading} from '../../hooks/useLoading'
import {useCustomNavigate} from '../../hooks/useRedirect'
import {PATHS} from '../../routes'
import {UserService} from '../../services/UserService'

const userService = new UserService()

const Header: React.FC = () => {
  const {isAdmin} = useAuth()
  const {navigateTo, createHandler} = useCustomNavigate()
  const handleLogoutLoading = useLoading(handleLogout, 'Finalizando sessão...')

  async function handleLogout() {
    return userService.logout().then(() => {
      navigateTo(PATHS.MAIN)
    })
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
          onClick={handleLogoutLoading}
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
