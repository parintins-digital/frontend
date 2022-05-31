import {Visibility, VisibilityOff} from '@mui/icons-material'
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft'
import GoogleIcon from '@mui/icons-material/Google'
import {
  Button,
  FormControl,
  FormHelperText,
  FormLabel,
  Grid,
  Input,
  InputAdornment,
  InputLabel,
  Typography,
} from '@mui/material'
import {useState} from 'react'
import {useForm} from 'react-hook-form'
import {Link} from 'react-router-dom'
import LoginVideo from '../../assets/Video.mp4'
import {colors} from '../../colors'
import {API_URL} from '../../Constants'
import {useCustomNavigate} from '../../hooks/useRedirect'
import {PATHS} from '../../routes'
import {PathBuilder} from '../../utils/PathBuilder'

interface FormData {
  email: string
  password: string
}

const Login: React.FC = () => {
  const {navigateTo, createHandler} = useCustomNavigate()
  const [showPassword, setShowPassword] = useState(false)
  const {register, handleSubmit} = useForm<FormData>()

  function handleGoogleAuth() {
    const loginURL = new PathBuilder(API_URL).addPath('login').build()
    window.open(loginURL, '_self')
  }

  function togglePasswordVisibility() {
    setShowPassword(!showPassword)
  }

  function onSubmit(data: FormData) {
    navigateTo(PATHS.HOMEPAGE)
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
            height: {xs: '100vh', md: 'auto'},
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
              Fazer Login
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
            <Grid container direction="column" alignItems="center" gap={2}>
              <Grid item sx={{marginTop: 2, marginBottom: 2}}>
                <FormLabel>Ou</FormLabel>
              </Grid>
              <Grid item>
                <Button
                  onClick={handleGoogleAuth}
                  variant="contained"
                  color="secondary"
                  startIcon={<GoogleIcon />}
                >
                  Entrar Com Google
                </Button>
              </Grid>
              <Grid
                item
                sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '8px',
                }}
              >
                <Typography variant="body2" component="label">
                  Ainda não possui uma conta?{' '}
                  <Link to={PATHS.SIGNUP}>Clique aqui para se inscrever.</Link>
                </Typography>
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

export default Login
