import ChevronLeftIcon from '@mui/icons-material/ChevronLeft'
import {
  Button,
  FormControl,
  FormHelperText,
  FormLabel,
  Grid,
  Input,
  InputLabel,
  Typography,
} from '@mui/material'
import {useContext} from 'react'
import {useForm} from 'react-hook-form'
import LoginVideo from '../../assets/Video.mp4'
import {colors} from '../../colors'
import {ToastContext} from '../../contexts/Toast'
import {useLoading} from '../../hooks/useLoading'
import {useCustomNavigate} from '../../hooks/useRedirect'
import {PATHS} from '../../routes'
import {UserService} from '../../services/UserService'

interface FormData {
  email: string
}

const userService = new UserService()

const ResetPassword: React.FC = () => {
  const {createHandler} = useCustomNavigate()
  const {showToast} = useContext(ToastContext)
  const {register, handleSubmit} = useForm<FormData>()

  const onSubmitLoading = useLoading(
    onSubmit,
    'Enviando link de redefinição de senha...',
    false
  )

  async function onSubmit(data: FormData) {
    return userService
      .resetPassword(data.email)
      .then(() => {
        showToast(
          'E-mail com o link de redefinição de senha enviado com sucesso. Verifique sua caixa de entrada.',
          'success'
        )
      })
      .catch(() => {
        showToast(
          'Ocorreu um erro inesperado. Por favor, tente novamente.',
          'error'
        )
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
            height: {xs: '100vh', md: 'auto'},
          }}
        >
          <Grid
            container
            padding={4}
            borderRadius={2}
            gap={1}
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
              Redefinir Senha
            </FormLabel>
            <FormControl fullWidth>
              <Typography variant="body1" color="GrayText">
                Você irá receber um link no seu e-mail com as devidas instruções
                para redefinir sua senha. O link para redefinição de senha é
                válido por 15 minutos.
              </Typography>
            </FormControl>
            <FormControl fullWidth>
              <InputLabel htmlFor="email">E-mail</InputLabel>
              <Input fullWidth type="email" id="email" {...register('email')} />
              <FormHelperText>Ex: meu.email@dominio.com.br</FormHelperText>
            </FormControl>
            <Grid container direction="column" alignItems="center" gap={2}>
              <Grid item>
                <Button type="submit" variant="contained" color="primary">
                  ENVIAR LINK
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

export default ResetPassword
