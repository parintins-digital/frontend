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

export interface EditPictureProps {
  open: (id: string) => void
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

const EditPictureModal: React.ForwardRefRenderFunction<
  EditPictureProps,
  Props
> = ({onClose}, ref) => {
  const [open, setOpen] = React.useState(false)
  const [imageURL, setImageURL] = useState<string>()
  const {showToast} = useContext(ToastContext)
  const {register, handleSubmit, reset} = useForm<FormData>()
  const [picture, setPicture] = useState<Picture>()
  const onSubmitLoading = useLoading(onSubmit, 'Atualizando figura...')

  async function fetchPicture(id: string) {
    const newPicture = await pictureService.findById(id)
    if (!newPicture) {
      showToast(
        `Esta figura não existe. Verifique se ${id} é um ID válido.`,
        'error'
      )
      handleClose()
      return
    }
    setPicture(newPicture)
    if (newPicture.image) {
      setImageURL(URL.createObjectURL(newPicture.image))
    }
  }

  function handleReset() {
    reset()
    setImageURL(undefined)
  }

  const handleOpen = useCallback((id: string) => {
    fetchPicture(id).then(() => {
      setOpen(true)
    })
  }, [])

  const handleClose = useCallback(() => {
    handleReset()
    setOpen(false)
    onClose()
  }, [])

  async function onSubmit(data: FormData) {
    if (!picture || !picture.id) return
    let fileImage: File | undefined
    const {category, description, title, author} = data

    if (imageURL) {
      const response = await fetch(imageURL)
      const blob = await response.blob()
      fileImage = new File([blob], `${data.title}.jpeg`)
    }

    const updatedPicture: Picture = {
      image: fileImage,
      description: description,
      title: title,
      category: category,
      author: author,
    }

    await pictureService
      .update(picture.id, updatedPicture)
      .then(() => {
        showToast('Figura atualizada com sucesso.', 'success')
        handleClose()
      })
      .catch(() => {
        showToast('Erro ao atualizar figura. Tente novamente.', 'error')
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

  useImperativeHandle<Record<string, any>, EditPictureProps>(ref, () => ({
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
          Editar figura
        </Typography>
        <form
          onSubmit={handleSubmit(onSubmitLoading)}
          style={{display: 'flex', flexDirection: 'column', gap: '24px'}}
        >
          <FormControl fullWidth>
            <InputLabel htmlFor="title">Título</InputLabel>
            <Input
              fullWidth
              defaultValue={picture?.title || ''}
              {...register('title')}
            />
          </FormControl>
          <FormControl fullWidth>
            <InputLabel htmlFor="description">Descrição</InputLabel>
            <Input
              defaultValue={picture?.description || ''}
              fullWidth
              {...register('description')}
            />
          </FormControl>
          <FormControl fullWidth>
            <InputLabel htmlFor="author">Autor</InputLabel>
            <Input
              defaultValue={picture?.author || ''}
              fullWidth
              {...register('author')}
            />
          </FormControl>

          <FormControl fullWidth>
            <InputLabel htmlFor="category">Categoria</InputLabel>
            <Select
              {...register('category')}
              label="Categoria"
              defaultValue={picture?.category || 'ATTRACTION'}
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

          <input
            type="file"
            accept=".png,.jpeg"
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
                  maxHeight: '300px',
                }}
              />
              <Button
                variant="outlined"
                color="primary"
                onClick={handleClearImage}
              >
                REMOVER IMAGEM
              </Button>
            </>
          )}

          <Button
            variant="contained"
            color="primary"
            type="submit"
            sx={{alignSelf: 'center'}}
          >
            ATUALIZAR
          </Button>
        </form>
      </Box>
    </Modal>
  )
}

export default forwardRef(EditPictureModal)
