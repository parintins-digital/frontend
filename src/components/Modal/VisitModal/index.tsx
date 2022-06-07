import CloseIcon from '@mui/icons-material/Close'
import {SxProps, Theme} from '@mui/material'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Modal from '@mui/material/Modal'
import Typography from '@mui/material/Typography'
import React, {
  forwardRef,
  useCallback,
  useContext,
  useEffect,
  useImperativeHandle,
  useState,
} from 'react'
import {colors} from '../../../colors'
import {API_URL} from '../../../Constants'
import {ToastContext} from '../../../contexts/Toast'
import {Picture} from '../../../entities/Picture'
import {useLoading} from '../../../hooks/useLoading'
import {PictureService} from '../../../services/PictureService'
import {VisitService} from '../../../services/VisitService'
import {dateFrom, dateTimeFrom} from '../../../utils/FormatDateTime'
import {PathBuilder} from '../../../utils/PathBuilder'

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

export interface VisitProps {
  open: () => void
  close: () => void
}

interface Props {
  pictureId: string
}

const pictureService = new PictureService()
const visitService = new VisitService()

const VisitModal: React.ForwardRefRenderFunction<VisitProps, Props> = (
  {pictureId},
  ref
) => {
  const [open, setOpen] = React.useState(false)
  const [imageURL, setImageURL] = useState<string>()
  const {showToast, closeToast} = useContext(ToastContext)
  const handleFetchPicture = useLoading(fetch, 'Buscando figura...', false)
  const handleSubmit = useLoading(onSubmit, 'Registrando visita...', false)
  const [picture, setPicture] = useState<Picture>()

  useEffect(() => {
    handleFetchPicture()
  }, [])

  async function fetch() {
    const newPicture = await pictureService.findById(pictureId)

    if (!newPicture) {
      showToast(
        'Código QRCode inválido. Por favor, leia outro código e tente novamente.',
        'error'
      )
      handleClose()
      return
    }
    if (newPicture.filename) {
      setImageURL(
        new PathBuilder(API_URL)
          .addPath('images')
          .addPath(newPicture.filename)
          .build()
      )
    }
    setPicture(newPicture)
    closeToast()
    handleOpen()
  }

  const handleOpen = useCallback(() => {
    setOpen(true)
  }, [])

  const handleClose = useCallback(() => {
    setOpen(false)
  }, [])

  async function onSubmit() {
    return visitService
      .create({
        pictureId: pictureId,
        visitedOn: new Date(),
      })
      .then(() => {
        showToast('Visita registrada com sucesso.', 'success')
        handleClose()
      })
      .catch(() => {
        showToast(
          'Erro ao registrar a visita. Por favor, leia o QRCode e tente novamente.',
          'error'
        )
      })
  }

  useImperativeHandle<Record<string, any>, VisitProps>(ref, () => ({
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
          Registrar uma visita
        </Typography>
        {imageURL && picture && <img src={imageURL} alt={picture.title} />}
        <Typography variant="body2" component="label">
          Hoje, {dateTimeFrom(new Date())}, você visitou
        </Typography>
        <Typography variant="h4" component="h1">
          {picture?.title}
        </Typography>
        <Typography variant="body1" component="p">
          {picture?.description}
        </Typography>
        {picture && picture.createdAt && (
          <Typography variant="body2" component="label" color={colors.default}>
            Cadastrado em {dateFrom(new Date(picture.createdAt))}
          </Typography>
        )}
        <Button
          variant="contained"
          color="primary"
          onClick={handleSubmit}
          sx={{alignSelf: 'center'}}
        >
          REGISTRAR
        </Button>
      </Box>
    </Modal>
  )
}

export default forwardRef(VisitModal)
