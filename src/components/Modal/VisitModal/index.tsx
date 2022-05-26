import React, {
  ChangeEvent,
  forwardRef,
  useCallback,
  useContext,
  useEffect,
  useImperativeHandle,
  useState,
} from 'react'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import Modal from '@mui/material/Modal'
import {useForm} from 'react-hook-form'
import {CategoryType, Picture} from '../../../entities/Picture'
import {PictureService} from '../../../services/PictureService'
import {
  FormControl,
  Input,
  InputLabel,
  MenuItem,
  Select,
  SxProps,
  Theme,
} from '@mui/material'
import {ToastContext} from '../../../contexts/Toast'
import {useLoading} from '../../../hooks/useLoading'
import {VisitService} from '../../../services/VisitService'
import {dateFrom, dateTimeFrom, timeFrom} from '../../../utils/FormatDateTime'
import {colors} from '../../../colors'

const style: SxProps<Theme> = {
  position: 'absolute' as const,
  top: '50%',
  left: '50%',
  display: 'flex',
  flexDirection: 'column',
  gap: 2,
  transform: 'translate(-50%, -50%)',
  width: 500,
  bgcolor: 'background.paper',
  boxShadow: 24,
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
  const handleFetchPicture = useLoading(
    fetch,
    `Buscando figura de ID: ${pictureId}`,
    false
  )
  const handleSubmit = useLoading(onSubmit, 'Registrando visita...')
  const [picture, setPicture] = useState<Picture>()

  useEffect(() => {
    handleFetchPicture()
  }, [])

  async function fetch() {
    const newPicture = await pictureService
      .findById(pictureId)
      .catch(() => undefined)

    if (!newPicture) {
      showToast(
        'Código QRCode inválido. Por favor, leia outro código e tente novamente.',
        'error'
      )
      handleClose()
      return
    }

    if (newPicture.image) setImageURL(URL.createObjectURL(newPicture.image))
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
    await visitService
      .create({
        pictureId: pictureId,
        visitedOn: new Date(),
      })
      .then(() => {
        showToast('Visita registrada com sucesso.', 'success')
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
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
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
