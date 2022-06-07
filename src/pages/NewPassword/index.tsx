import {Visibility, VisibilityOff} from '@mui/icons-material'
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft'
import {
  Button,
  FormControl,
  FormLabel,
  Grid,
  Input,
  InputAdornment,
  InputLabel,
} from '@mui/material'
import {useContext, useEffect, useState} from 'react'
import {useForm} from 'react-hook-form'
import {useParams} from 'react-router-dom'
import LoginVideo from '../../assets/LoginVideo.mp4'
import {colors} from '../../colors'
import FullLoading from '../../components/FullLoading'
import {ToastContext} from '../../contexts/Toast'
import {useLoading} from '../../hooks/useLoading'
import {useCustomNavigate} from '../../hooks/useRedirect'
import {PATHS} from '../../routes'
import {UserService} from '../../services/UserService'

interface FormData {
  password: string
  confirmPassword: string
}

const userService = new UserService()

const NewPassword: React.FC = () => {
  const {token} = useParams()
  const {navigateTo, createHandler} = useCustomNavigate()
  const [tokenIsValid, setTokenIsValid] = useState(false)
  const {showToast} = useContext(ToastContext)
  const [showPassword, setShowPassword] = useState(false)
  const {register, handleSubmit} = useForm<FormData>()

  const onSubmitLoading = useLoading(
    onSubmit,
    'Aguarde um momento. Atualizando senha...',
    false
  )

  useEffect(() => {
    if (token) {
      userService.validateResetToken(token).then((isValid) => {
        if (isValid) {
          setTokenIsValid(true)
        } else {
          navigateTo(PATHS.LOGIN)
        }
      })
    }
  }, [])

  function togglePasswordVisibility() {
    setShowPassword(!showPassword)
  }

  async function onSubmit(data: FormData) {
    if (!token) {
      navigateTo(PATHS.LOGIN)
      return
    }

    const {confirmPassword, password} = data

    if (!password) {
      showToast('Preencha o campo de senha.', 'error')
    }

    if (!confirmPassword) {
      showToast('Preencha o campo de confirmação de senha.', 'error')
      return
    }

    if (password === confirmPassword) {
      return userService
        .updatePassword(token, password)
        .then(() => {
          showToast('Sua senha foi atualizada com sucesso.', 'success')
          navigateTo(PATHS.LOGIN)
        })
        .catch(() => {
          showToast(
            'Erro ao atualizar sua senha. Por favor, tente novamente ou acesse novamente o link do seu e-mail.',
            'error'
          )
        })
    }
  }

  if (!tokenIsValid) {
    return <FullLoading />
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
            gap={2}
            component="form"
            onSubmit={handleSubmit(onSubmitLoading)}
          >
            <ChevronLeftIcon
              onClick={createHandler(PATHS.LOGIN)}
              sx={{
                cursor: 'pointer',
              }}
            />
            <FormLabel
              sx={{
                fontWeight: 'bold',
              }}
            >
              Definir Nova Senha
            </FormLabel>
            <FormControl fullWidth>
              <InputLabel htmlFor="password">Nova Senha</InputLabel>
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
            <FormControl fullWidth>
              <InputLabel htmlFor="confirmPassword">Confirmar Senha</InputLabel>
              <Input
                type={showPassword ? 'text' : 'password'}
                id="confirmPassword"
                {...register('confirmPassword')}
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
                  ATUALIZAR SENHA
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

export default NewPassword
