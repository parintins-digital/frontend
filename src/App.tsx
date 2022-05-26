import {createTheme, CssBaseline} from '@mui/material'
import {ThemeProvider} from '@mui/system'
import {DOMAIN} from './Constants'
import AuthenticationProvider from './contexts/Authentication'
import ToastProvider from './contexts/Toast'
import Router from './routes'

import './global-styles.css'
import {colors} from './colors'

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
  console.info('Bem-vindo a Parintins Digital, no domínio:', DOMAIN)
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
