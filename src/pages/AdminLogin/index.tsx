import {Visibility, VisibilityOff} from '@mui/icons-material'
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft'
import {
  Button,
  FormControl,
  FormHelperText,
  FormLabel,
  Grid,
  Input,
  InputAdornment,
  InputLabel,
} from '@mui/material'
import {useContext, useState} from 'react'
import {useForm} from 'react-hook-form'
import LoginVideo from '../../assets/LoginVideo.mp4'
import {colors} from '../../colors'
import {ToastContext} from '../../contexts/Toast'
import {useAuth} from '../../hooks/useAuth'
import {useCustomNavigate} from '../../hooks/useRedirect'
import {PATHS} from '../../routes'

interface FormData {
  email: string
  password: string
}

const AdminLogin: React.FC = () => {
  const {navigateTo, createHandler} = useCustomNavigate()
  const {loginAsAdmin} = useAuth()
  const {showToast} = useContext(ToastContext)
  const [showPassword, setShowPassword] = useState(false)
  const {register, handleSubmit} = useForm<FormData>()

  function togglePasswordVisibility() {
    setShowPassword(!showPassword)
  }

  function onSubmit(data: FormData) {
    loginAsAdmin(data.email, data.password)
      .then(() => {
        navigateTo(PATHS.HOMEPAGE)
      })
      .catch(() => {
        showToast('Usuário e/ou senha incorretos. Tente novamente.', 'error')
      })
  }

  return (
    <>
      <Grid
        container
        justifyContent="center"
        alignItems="center"
        height="100vh"
        width="100vw"
      >
        <Grid
          container
          direction="row"
          bgcolor={colors.backgroundElement}
          sx={{
            width: {xs: '100vw', md: '50vw'},
            minHeight: {xs: '100vh', md: 'auto'},
          }}
        >
          <Grid
            container
            padding={4}
            borderRadius={2}
            gap={1}
            component="form"
            onSubmit={handleSubmit(onSubmit)}
          >
            <ChevronLeftIcon
              onClick={createHandler(PATHS.MAIN)}
              sx={{
                cursor: 'pointer',
              }}
            />
            <FormLabel
              sx={{
                fontWeight: 'bold',
              }}
            >
              Fazer Login (Painel do Administrador)
            </FormLabel>
            <FormControl fullWidth>
              <InputLabel htmlFor="email">E-mail</InputLabel>
              <Input fullWidth type="email" id="email" {...register('email')} />
              <FormHelperText>Ex: meu.email@meudominio.com.br</FormHelperText>
            </FormControl>
            <FormControl fullWidth>
              <InputLabel htmlFor="password">Senha</InputLabel>
              <Input
                type={showPassword ? 'text' : 'password'}
                id="password"
                {...register('password')}
                endAdornment={
                  <InputAdornment
                    position="end"
                    sx={{
                      cursor: 'pointer',
                    }}
                  >
                    {showPassword ? (
                      <VisibilityOff onClick={togglePasswordVisibility} />
                    ) : (
                      <Visibility onClick={togglePasswordVisibility} />
                    )}
                  </InputAdornment>
                }
              />
            </FormControl>
            <Grid container direction="column" alignItems="center" gap={2}>
              <Grid item>
                <Button type="submit" variant="contained" color="primary">
                  Entrar
                </Button>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Grid>

      <video
        src={LoginVideo}
        loop
        muted
        playsInline
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100vw',
          height: '100vh',
          objectFit: 'cover',
          zIndex: -1,
        }}
        autoPlay
      />
    </>
  )
}

export default AdminLogin
