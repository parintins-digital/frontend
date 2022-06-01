import CloseIcon from '@mui/icons-material/Close'
import {SxProps, Theme} from '@mui/material'
import Box from '@mui/material/Box'
import Modal from '@mui/material/Modal'
import Typography from '@mui/material/Typography'
import {Html5Qrcode, Html5QrcodeSupportedFormats} from 'html5-qrcode'
import {Html5QrcodeCameraScanConfig} from 'html5-qrcode/esm/html5-qrcode'
import React, {
  forwardRef,
  useCallback,
  useImperativeHandle,
  useState,
} from 'react'
import {useCustomNavigate} from '../../../hooks/useRedirect'

const style: SxProps<Theme> = {
  position: 'absolute' as const,
  top: '50%',
  left: '50%',
  display: 'flex',
  flexDirection: 'column',
  gap: 2,
  transform: 'translate(-50%, -50%)',
  width: {xs: '100vw', md: '50vw'},
  height: {xs: '100vh', md: 'auto'},
  bgcolor: 'background.paper',
  boxShadow: 24,
  p: 4,
  borderRadius: 1,
}

export interface ReadQRCodeModalProps {
  open: () => void
  close: () => void
}

const SCAN_ELEMENT = 'reader'

const ReadQRCodeModal: React.ForwardRefRenderFunction<ReadQRCodeModalProps> = (
  _,
  ref
) => {
  const [open, setOpen] = React.useState(false)
  const {navigateToAnotherDomain} = useCustomNavigate()
  const [scanRef] = useCustomRef<HTMLDivElement>(() => settingQRCodeScanner())
  const [scanner, setScanner] = useState<Html5Qrcode>()

  function settingQRCodeScanner() {
    const html5Qrcode = new Html5Qrcode(SCAN_ELEMENT, {
      formatsToSupport: [Html5QrcodeSupportedFormats.QR_CODE],
      verbose: false,
    })
    const config: Html5QrcodeCameraScanConfig = {
      fps: 10,
      qrbox: {width: 250, height: 250},
    }
    html5Qrcode.start({facingMode: 'environment'}, config, onSucess, undefined)
    setScanner(html5Qrcode)
  }

  function onSucess(url: string) {
    navigateToAnotherDomain(url)
  }

  const handleOpen = useCallback(() => {
    setOpen(true)
  }, [])

  const handleClose = useCallback(() => {
    setOpen(false)
    scanner?.stop()
  }, [])

  useImperativeHandle<Record<string, any>, ReadQRCodeModalProps>(ref, () => ({
    open: handleOpen,
    close: handleClose,
  }))

  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        <CloseIcon
          onClick={handleClose}
          sx={{
            marginLeft: 'auto',
            cursor: 'pointer',
          }}
        />
        <Typography variant="h6" component="h2">
          Registrar Visita
        </Typography>
        <Typography variant="body1" component="label">
          Permita que a aplicação acesse sua câmera para leitura e registro de
          uma visita.
        </Typography>
        <div
          id={SCAN_ELEMENT}
          ref={scanRef}
          style={{
            width: '90%',
          }}
        ></div>
      </Box>
    </Modal>
  )
}

export default forwardRef(ReadQRCodeModal)

function useCustomRef<T extends HTMLElement>(onRender: () => void) {
  const ref = useCallback((node: T) => {
    if (node !== null) {
      onRender()
    }
  }, [])
  return [ref]
}
