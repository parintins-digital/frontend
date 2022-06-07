import CloseIcon from '@mui/icons-material/Close'
import {SxProps, Theme} from '@mui/material'
import Box from '@mui/material/Box'
import Modal from '@mui/material/Modal'
import React, {
  forwardRef,
  useCallback,
  useImperativeHandle,
  useState,
} from 'react'

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

export interface ShowModalProps {
  open: (url: string) => void
  close: () => void
}

const ShowImageModal: React.ForwardRefRenderFunction<ShowModalProps> = (
  _,
  ref
) => {
  const [open, setOpen] = React.useState(false)
  const [imageURL, setImageURL] = useState<string>()

  const handleOpen = useCallback((url: string) => {
    setOpen(true)
    setImageURL(url)
  }, [])

  const handleClose = useCallback(() => {
    setOpen(false)
  }, [])

  useImperativeHandle<Record<string, any>, ShowModalProps>(ref, () => ({
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
        <img src={imageURL} alt="Figura em tela cheia" />
      </Box>
    </Modal>
  )
}

export default forwardRef(ShowImageModal)
