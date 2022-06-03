import CloseIcon from '@mui/icons-material/Close'
import {SxProps, Theme} from '@mui/material'
import Box from '@mui/material/Box'
import Modal from '@mui/material/Modal'
import Typography from '@mui/material/Typography'
import {Html5Qrcode, Html5QrcodeSupportedFormats} from 'html5-qrcode'
import {Html5QrcodeResult} from 'html5-qrcode/esm/core'
import {Html5QrcodeCameraScanConfig} from 'html5-qrcode/esm/html5-qrcode'
import React, {
  forwardRef,
  useCallback,
  useContext,
  useImperativeHandle,
} from 'react'
import {DOMAIN} from '../../../Constants'
import {ToastContext} from '../../../contexts/Toast'
import {useCustomNavigate} from '../../../hooks/useRedirect'

const style: SxProps<Theme> = {
  display: 'flex',
  flexDirection: 'column',
  gap: 2,
  width: {xs: '100vw', md: '50vw'},
  height: 'auto',
  bgcolor: 'background.paper',
  boxShadow: 24,
  margin: '16px auto',
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
  const {showToast} = useContext(ToastContext)
  const {navigateToAnotherDomain} = useCustomNavigate()
  const [scanRef] = useCustomRef<HTMLDivElement>(() => settingQRCodeScanner())
  let scanner: Html5Qrcode

  function settingQRCodeScanner() {
    const html5Qrcode = new Html5Qrcode(SCAN_ELEMENT, {
      formatsToSupport: [Html5QrcodeSupportedFormats.QR_CODE],
      verbose: false,
    })
    const config: Html5QrcodeCameraScanConfig = {
      fps: 10,
      qrbox: {width: 250, height: 250},
    }
    html5Qrcode.start(
      {facingMode: 'environment'},
      config,
      (url, result) => onSucess(url, result, html5Qrcode),
      undefined
    )
    scanner = html5Qrcode
  }

  function onSucess(
    url: string,
    result: Html5QrcodeResult,
    scanner: Html5Qrcode
  ) {
    if (url.includes(DOMAIN)) {
      navigateToAnotherDomain(url)
      scanner.stop()
    } else {
      showToast(
        'QRCode inválido para registro de visita. Por favor, leia um QR Code válido.',
        'error'
      )
    }
  }

  const handleOpen = useCallback(() => {
    setOpen(true)
  }, [])

  const handleClose = useCallback(() => {
    setOpen(false)
    scanner.stop()
  }, [])

  useImperativeHandle<Record<string, any>, ReadQRCodeModalProps>(ref, () => ({
    open: handleOpen,
    close: handleClose,
  }))

  return (
    <Modal
      sx={{
        overflowY: 'auto',
      }}
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
            width: '100%',
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
