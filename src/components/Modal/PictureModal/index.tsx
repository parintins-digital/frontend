import React, {
  ChangeEvent,
  forwardRef,
  useCallback,
  useContext,
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

const style: SxProps<Theme> = {
  position: 'absolute' as const,
  top: '50%',
  left: '50%',
  display: 'flex',
  flexDirection: 'column',
  gap: 4,
  transform: 'translate(-50%, -50%)',
  width: 500,
  bgcolor: 'background.paper',
  boxShadow: 24,
  p: 4,
  borderRadius: 1,
}

export interface PictureProps {
  open: () => void
  close: () => void
}

interface FormData {
  title: string
  description: string
  category: CategoryType
}

const pictureService = new PictureService()

const PictureModal: React.ForwardRefRenderFunction<PictureProps> = (_, ref) => {
  const [open, setOpen] = React.useState(false)
  const [imageURL, setImageURL] = useState<string>()
  const {showToast} = useContext(ToastContext)
  const {register, handleSubmit, reset} = useForm<FormData>()

  function handleReset() {
    reset()
    setImageURL(undefined)
  }

  const handleOpen = useCallback(() => {
    setOpen(true)
  }, [])

  const handleClose = useCallback(() => {
    handleReset()
    setOpen(false)
  }, [])

  async function onSubmit(data: FormData) {
    let fileImage: File | undefined
    const {category, description, title} = data

    if (imageURL) {
      const response = await fetch(imageURL)
      const blob = await response.blob()
      fileImage = new File([blob], `${data.title}.jpeg`)
    }

    const newPicture: Picture = {
      image: fileImage,
      description: description,
      title: title,
      category: category,
    }

    await pictureService
      .create(newPicture)
      .then(() => {
        showToast('Figura cadastrada com sucesso.', 'success')
      })
      .catch(() => {
        showToast('Erro ao cadastrar uma figura. Tente novamente.', 'error')
      })
  }

  function handleFileChange(event: ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0]
    if (!file) return
    const url = URL.createObjectURL(file)
    setImageURL(url)
  }

  function handleClearImage() {
    setImageURL(undefined)
  }

  useImperativeHandle<Record<string, any>, PictureProps>(ref, () => ({
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
        <Typography
          id="modal-modal-title"
          variant="h6"
          component="h2"
        >
          Cadastrar uma nova figura
        </Typography>
        <form
          onSubmit={handleSubmit(onSubmit)}
          style={{display: 'flex', flexDirection: 'column', gap: '24px'}}
        >
          <FormControl fullWidth>
            <InputLabel htmlFor="title">Título</InputLabel>
            <Input
              fullWidth
              {...register('title')}
            />
          </FormControl>
          <FormControl fullWidth>
            <InputLabel htmlFor="description">Descrição</InputLabel>
            <Input
              fullWidth
              {...register('description')}
            />
          </FormControl>

          <FormControl fullWidth>
            <InputLabel htmlFor="category">Categoria</InputLabel>
            <Select
              {...register('category')}
              label="Categoria"
              defaultValue="ATTRACTION"
            >
              <MenuItem value={'ATTRACTION'}>Pontos Turísticos</MenuItem>
              <MenuItem value={'CULTURE'}>Cultura</MenuItem>
              <MenuItem value={'LANDMARK'}>Point da Cidade</MenuItem>
              <MenuItem value={'COMMUNITY'}>
                Personalidades e Comunidades
              </MenuItem>
            </Select>
          </FormControl>

          <Typography
            variant="body1"
            component="div"
          >
            Faça o upload de uma imagem:
          </Typography>

          <input
            type="file"
            name="image"
            onChange={handleFileChange}
          />

          {imageURL && (
            <>
              <img
                src={imageURL}
                style={{
                  margin: '0 auto',
                  maxWidth: '300px',
                }}
              />
              <Button
                variant="outlined"
                color="primary"
                onClick={handleClearImage}
              >
                Remover Imagem
              </Button>
            </>
          )}

          <Button
            variant="contained"
            color="primary"
            type="submit"
            sx={{alignSelf: 'center'}}
          >
            CADASTRAR
          </Button>
        </form>
      </Box>
    </Modal>
  )
}

export default forwardRef(PictureModal)
