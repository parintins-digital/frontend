import {Alert, CircularProgress, Snackbar} from '@mui/material'
import {createContext, useState} from 'react'

type ToastType = 'error' | 'warning' | 'success' | 'info' | 'awaiting'

interface ContextProps {
  showToast: (message: string, type: ToastType) => void
  closeToast: () => void
}

export const ToastContext = createContext<ContextProps>({
  showToast: () => null,
  closeToast: () => null,
})

interface Props {
  children: React.ReactNode
}

const ToastProvider: React.FC<Props> = ({children}: Props) => {
  const [visible, setVisible] = useState(false)
  const [message, setMessage] = useState('Alerta!')
  const [type, setType] = useState<ToastType>('info')

  function showToast(message: string, type: ToastType) {
    setMessage(message)
    setType(type)
    setVisible(true)
  }

  function closeToast() {
    setVisible(false)
  }

  return (
    <ToastContext.Provider value={{showToast, closeToast}}>
      {children}
      <Snackbar
        open={visible}
        autoHideDuration={type !== 'awaiting' ? 6000 : undefined}
        onClose={closeToast}
        anchorOrigin={{vertical: 'bottom', horizontal: 'center'}}
      >
        {type !== 'awaiting' ? (
          <Alert severity={type} sx={{width: '100%'}}>
            {message}
          </Alert>
        ) : (
          <Alert
            onClose={closeToast}
            icon={<CircularProgress size={24} />}
            severity="info"
            sx={{
              width: '100%',
            }}
          >
            {message}
          </Alert>
        )}
      </Snackbar>
    </ToastContext.Provider>
  )
}

export default ToastProvider
