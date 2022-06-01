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
import {useContext, useState} from 'react'
import {useForm} from 'react-hook-form'
import {Link} from 'react-router-dom'
import LoginVideo from '../../assets/Video.mp4'
import {colors} from '../../colors'
import {API_URL} from '../../Constants'
import {ToastContext} from '../../contexts/Toast'
import {User} from '../../entities/User'
import {useLoading} from '../../hooks/useLoading'
import {useCustomNavigate} from '../../hooks/useRedirect'
import {PATHS} from '../../routes'
import {UserService} from '../../services/UserService'
import {PathBuilder} from '../../utils/PathBuilder'

interface FormData {
  firstName: string
  lastName: string
  email: string
  password: string
}

const userService = new UserService()

const SignUp: React.FC = () => {
  const {navigateTo, createHandler} = useCustomNavigate()
  const [showPassword, setShowPassword] = useState(false)
  const {showToast} = useContext(ToastContext)
  const {register, handleSubmit} = useForm<FormData>()

  const onSubmitLoading = useLoading(
    onSubmit,
    'Realizando o cadastro de usuário...',
    false
  )

  function handleGoogleAuth() {
    const loginURL = new PathBuilder(API_URL).addPath('login').build()
    window.open(loginURL, '_self')
  }

  async function onSubmit(data: FormData) {
    const {email, firstName, lastName, password} = data

    const newUser: User = {
      email: email,
      firstName: firstName,
      lastName: lastName,
      password: password,
      createdAt: new Date(),
    }

    return userService
      .create(newUser)
      .then(() => {
        navigateTo(PATHS.LOGIN)
      })
      .catch(() => {
        showToast(
          'Erro ao cadastrar usuário. Por favor, tente novamente.',
          'error'
        )
      })
  }

  function togglePasswordVisibility() {
    setShowPassword(!showPassword)
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
          sx={{
            width: {xs: '100vw', md: '50vw'},
            height: {xs: '100vh', md: 'auto'},
          }}
          bgcolor={colors.backgroundElement}
        >
          <Grid
            container
            padding={4}
            borderRadius={2}
            gap={2}
            component="form"
            onSubmit={handleSubmit(onSubmitLoading)}
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
              Fazer Cadastro
            </FormLabel>
            <FormControl fullWidth>
              <InputLabel htmlFor="firstName">Nome</InputLabel>
              <Input
                fullWidth
                type="text"
                id="firstName"
                {...register('firstName')}
              />
            </FormControl>
            <FormControl fullWidth>
              <InputLabel htmlFor="lastName">Sobrenome</InputLabel>
              <Input
                fullWidth
                type="text"
                id="lastName"
                {...register('lastName')}
              />
            </FormControl>
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
                  Cadastrar-se
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
              <Grid item>
                <Typography variant="body2" component="label">
                  Já possui uma conta?{' '}
                  <Link to={PATHS.LOGIN}>Clique aqui para fazer o login.</Link>
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

export default SignUp
