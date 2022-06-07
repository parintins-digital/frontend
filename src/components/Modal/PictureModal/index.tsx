import CloseIcon from '@mui/icons-material/Close'
import {
  FormControl,
  Input,
  InputLabel,
  MenuItem,
  Select,
  SxProps,
  Theme,
} from '@mui/material'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Modal from '@mui/material/Modal'
import Typography from '@mui/material/Typography'
import React, {
  ChangeEvent,
  forwardRef,
  useCallback,
  useContext,
  useImperativeHandle,
  useState,
} from 'react'
import {useForm} from 'react-hook-form'
import {ToastContext} from '../../../contexts/Toast'
import {CategoryType, Picture} from '../../../entities/Picture'
import {useLoading} from '../../../hooks/useLoading'
import {PictureService} from '../../../services/PictureService'

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

export interface PictureProps {
  open: () => void
  close: () => void
}

interface FormData {
  title: string
  description: string
  category: CategoryType
  author: string
}

const pictureService = new PictureService()

interface Props {
  onClose: () => void
}

const PictureModal: React.ForwardRefRenderFunction<PictureProps, Props> = (
  {onClose},
  ref
) => {
  const [open, setOpen] = React.useState(false)
  const [imageURL, setImageURL] = useState<string>()
  const {showToast} = useContext(ToastContext)
  const {register, handleSubmit, reset} = useForm<FormData>()
  const onSubmitLoading = useLoading(onSubmit, 'Registrando figura...', false)

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
    onClose()
  }, [])

  async function onSubmit(data: FormData) {
    let fileImage: File | undefined
    const {category, description, title, author} = data

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
      author: author,
    }

    await pictureService
      .create(newPicture)
      .then(() => {
        showToast('Figura cadastrada com sucesso.', 'success')
        handleClose()
      })
      .catch(() => {
        showToast('Erro ao cadastrar uma figura. Tente novamente.', 'error')
      })
  }

  function handleFileChange(event: ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0]
    if (!file) {
      event.target.value = ''
      return
    }
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
      sx={{
        overflowY: 'auto',
      }}
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
        <Typography id="modal-modal-title" variant="h6" component="h2">
          Cadastrar uma nova figura
        </Typography>
        <form
          onSubmit={handleSubmit(onSubmitLoading)}
          style={{display: 'flex', flexDirection: 'column', gap: '1rem'}}
        >
          <FormControl fullWidth>
            <InputLabel htmlFor="title">Título</InputLabel>
            <Input fullWidth {...register('title')} />
          </FormControl>
          <FormControl fullWidth>
            <InputLabel htmlFor="description">Descrição</InputLabel>
            <Input fullWidth {...register('description')} />
          </FormControl>
          <FormControl fullWidth>
            <InputLabel htmlFor="author">Autor</InputLabel>
            <Input fullWidth {...register('author')} />
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

          <Typography variant="body1" component="div">
            Faça o upload de uma imagem:
          </Typography>

          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexWrap: 'wrap',
              gap: '8px',
            }}
          >
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'column',
                gap: 2,
                alignItems: 'start',
              }}
            >
              {imageURL && (
                <Button
                  variant="outlined"
                  color="primary"
                  onClick={handleClearImage}
                >
                  REMOVER IMAGEM
                </Button>
              )}
              <input type="file" name="image" onChange={handleFileChange} />
            </Box>
            {imageURL && (
              <>
                <img
                  src={imageURL}
                  style={{
                    maxWidth: '200px',
                  }}
                />
              </>
            )}
          </Box>

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
