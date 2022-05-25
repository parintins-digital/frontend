import {createTheme, CssBaseline} from '@mui/material'
import {ThemeProvider} from '@mui/system'
import {DOMAIN} from './Constants'
import AuthenticationProvider from './contexts/Authentication'
import ToastProvider from './contexts/Toast'
import Router from './routes'

const theme = createTheme({
  palette: {
    primary: {
      main: '#F79F1F',
      contrastText: '#FFF',
    },
    secondary: {
      main: '#1f75f7',
      contrastText: '#FFF',
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
