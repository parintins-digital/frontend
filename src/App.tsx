import {createTheme, CssBaseline} from '@mui/material'
import {ThemeProvider} from '@mui/system'
import {colors} from './colors'
import {DOMAIN} from './Constants'
import AuthenticationProvider from './contexts/Authentication'
import ToastProvider from './contexts/Toast'
import './global-styles.css'
import Router from './routes'

const theme = createTheme({
  palette: {
    primary: {
      main: colors.primary,
      contrastText: colors.primaryContrast,
    },
    secondary: {
      main: colors.secondary,
      contrastText: colors.secondaryContrast,
    },
  },
})

function App() {
  console.info('Bem-vindo a Parintins Digital em:', DOMAIN)
  return (
    <AuthenticationProvider>
      <ToastProvider>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <Router />
        </ThemeProvider>
      </ToastProvider>
    </AuthenticationProvider>
  )
}

export default App
