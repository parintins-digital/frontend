import {createTheme, CssBaseline} from '@mui/material'
import {ThemeProvider} from '@mui/system'
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
