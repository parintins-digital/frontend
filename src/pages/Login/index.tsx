import {
  Button,
  Divider,
  FormControl,
  FormHelperText,
  FormLabel,
  Grid,
  Input,
  InputLabel,
} from '@mui/material'
import GoogleIcon from '@mui/icons-material/Google'
import {colors} from '../../colors'

import LogoImage from '../../assets/Logo.png'
import {useNavigate} from 'react-router-dom'
import LoginVideo from '../../assets/Video.mp4'
import {PathBuilder} from '../../utils/PathBuilder'
import {API_URL} from '../../Constants'

const Login: React.FC = () => {
  const navigate = useNavigate()

  function handleGoogleAuth() {
    const loginURL = new PathBuilder(API_URL).addPath('login').build()
    window.open(loginURL, '_self')
  }

  function handleSignIn() {
    navigate('/homepage')
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
          width="60%"
          bgcolor={colors.backgroundElement}
        >
          <Grid
            container
            lg={6}
            padding={4}
            borderRadius={2}
            gap={2}
          >
            <Grid item>
              <FormLabel
                sx={{
                  fontWeight: 'bold',
                }}
              >
                Fazer Login
              </FormLabel>
            </Grid>
            <Grid
              item
              lg={12}
            >
              <FormControl fullWidth>
                <InputLabel htmlFor="email">E-mail</InputLabel>
                <Input
                  fullWidth
                  type="email"
                  id="email"
                />
                <FormHelperText>Ex: meu.email@meudominio.com.br</FormHelperText>
              </FormControl>
            </Grid>
            <Grid
              item
              lg={12}
            >
              <FormControl fullWidth>
                <InputLabel htmlFor="password">Senha</InputLabel>
                <Input
                  type="password"
                  id="password"
                />
              </FormControl>
            </Grid>
            <Grid
              item
              lg={12}
            >
              <Grid
                container
                direction="column"
                alignItems="center"
                gap={2}
              >
                <Grid item>
                  <Button
                    onClick={handleSignIn}
                    variant="contained"
                    color="primary"
                  >
                    Entrar
                  </Button>
                </Grid>
              </Grid>
            </Grid>
            <Grid
              item
              lg={12}
            >
              <Divider />
            </Grid>
            <Grid
              item
              lg={12}
            >
              <Grid
                container
                direction="column"
                alignItems="center"
                gap={2}
              >
                <Grid item>
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
              </Grid>
            </Grid>
          </Grid>

          <Grid
            container
            lg={4}
            justifyContent="center"
            alignItems="center"
            bgcolor={colors.backgroundElement}
          >
            <Grid
              item
              lg={12}
            >
              <img
                style={{
                  width: '500px',
                  height: 'auto',
                }}
                src={LogoImage}
                alt="Parintins Digital"
              />
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
          width: '100%',
          height: 'auto',
          zIndex: -1,
        }}
        autoPlay
      />
    </>
  )
}

export default Login
