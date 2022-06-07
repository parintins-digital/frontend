import {Search} from '@mui/icons-material'
import AccountTreeIcon from '@mui/icons-material/AccountTree'
import AddIcon from '@mui/icons-material/Add'
import HolidayVillageIcon from '@mui/icons-material/HolidayVillage'
import HomeIcon from '@mui/icons-material/Home'
import LocationCityIcon from '@mui/icons-material/LocationCity'
import TheaterComedyIcon from '@mui/icons-material/TheaterComedy'
import TheatersIcon from '@mui/icons-material/Theaters'
import {
  BottomNavigation,
  BottomNavigationAction,
  Box,
  debounce,
  Divider,
  Drawer,
  FormControl,
  Grid,
  Input,
  InputAdornment,
  InputLabel,
  InputProps,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Toolbar,
  Typography,
} from '@mui/material'
import {useContext, useEffect, useRef, useState} from 'react'
import {useParams} from 'react-router-dom'
import ConfirmDialogue, {
  ConfirmDialogueProps,
} from '../../components/Dialogue/ConfirmDialogue'
import Footer from '../../components/Footer'
import FullLoading from '../../components/FullLoading'
import Header from '../../components/Header'
import EditPictureModal, {
  EditPictureProps,
} from '../../components/Modal/EditPictureModal'
import PictureModal, {PictureProps} from '../../components/Modal/PictureModal'
import ReadQRCodeModal, {
  ReadQRCodeModalProps,
} from '../../components/Modal/ReadQRCodeModal'
import ShowImageModal, {
  ShowModalProps,
} from '../../components/Modal/ShowImageModal'
import VisitModal, {VisitProps} from '../../components/Modal/VisitModal'
import PicturesList from '../../components/PicturesList'
import VisitList from '../../components/VisitList'
import {API_URL} from '../../Constants'
import {ToastContext} from '../../contexts/Toast'
import {categoryColorOf, Picture} from '../../entities/Picture'
import {useAuth} from '../../hooks/useAuth'
import {useFilter} from '../../hooks/useFilter'
import {useLoading} from '../../hooks/useLoading'
import {useCustomNavigate} from '../../hooks/useRedirect'
import {useTab} from '../../hooks/useTab'
import {PATHS} from '../../routes'
import {
  Filter as FilterPicture,
  PictureService,
} from '../../services/PictureService'
import {Filter as FilterVisit} from '../../services/VisitService'
import {PathBuilder} from '../../utils/PathBuilder'

enum Tabs {
  HOME,
  PONTOS_TURISTICOS,
  CULTURA,
  POINT,
  PERSONALIDADES,
  VISITAS,
  CRIAR_FIGURA,
  CRIAR_VISITA,
}

const pictureService = new PictureService()

const Homepage: React.FC = () => {
  const {pictureId} = useParams()
  const {changeTab, getCurrentTab} = useTab(Tabs.HOME)
  const {navigateTo} = useCustomNavigate()
  const {isAdmin, isAuthenticated} = useAuth()

  const [hasLogin, setHasLogin] = useState<boolean>()

  const pictureModal = useRef<PictureProps>(null)
  const readQRCodeModal = useRef<ReadQRCodeModalProps>(null)
  const editPictureModal = useRef<EditPictureProps>(null)
  const confirmDialogue = useRef<ConfirmDialogueProps>(null)
  const visitModal = useRef<VisitProps>(null)
  const showImageModal = useRef<ShowModalProps>(null)

  const {showToast} = useContext(ToastContext)

  const [pictureFilters, setPictureFilters] = useState<FilterPicture>({})
  const [visitFilters, setVisitFilters] = useState<FilterVisit>({})

  const handlePictureFilter = debounce(setPictureFilters, 1000)
  const handleVisitFilter = debounce(setVisitFilters, 1000)

  const {registerFilter: registerFilterPicture} = useFilter<FilterPicture>({
    onChange: handlePictureFilter,
  })
  const {registerFilter: registerFilterVisit} = useFilter<FilterVisit>({
    onChange: handleVisitFilter,
  })

  const deletePictureLoading = useLoading(
    deletePicture,
    'Aguarde um momento. Deletando figura...',
    false
  )

  useEffect(() => {
    isAuthenticated().then((response) => {
      if (response) {
        setHasLogin(true)
      } else {
        navigateTo(PATHS.LOGIN)
      }
    })
  }, [])

  function handleCreatePicture() {
    pictureModal.current?.open()
  }

  function handleCreatVisit() {
    readQRCodeModal.current?.open()
  }

  function handleEditPicture(id: string) {
    editPictureModal.current?.open(id)
  }

  function handleDeletePicture(id: string) {
    confirmDialogue.current?.onConfirm((response) => {
      if (response) {
        deletePictureLoading(id)
      }
    })
    confirmDialogue.current?.open('Você deseja excluir esta figura?')
  }

  async function deletePicture(id: string) {
    try {
      await pictureService.delete(id)
      showToast('Figura deletada com sucesso.', 'success')
      window.location.reload()
    } catch {
      showToast('Erro ao deletar figura. Por favor, tente novamente.', 'error')
    }
  }

  async function handleCreateVisitForEspecificPicture(picture: Picture) {
    readQRCodeModal.current?.open(picture.id)
  }

  async function showImageFullScreen(picture: Picture) {
    if (picture.filename) {
      showImageModal.current?.open(
        new PathBuilder(API_URL)
          .addPath('images')
          .addPath(picture.filename)
          .build()
      )
    } else {
      showToast('Figura sem nenhuma imagem cadastrada.', 'error')
    }
  }

  if (!hasLogin) {
    return <FullLoading />
  }

  return (
    <Grid container height="100vh">
      <Header />

      <Box zIndex={0} display="flex" gap={40}>
        <Drawer
          variant="permanent"
          sx={{
            display: {
              xl: 'block',
              lg: 'block',
              md: 'none',
              sm: 'none',
              xs: 'none',
            },
          }}
        >
          <Toolbar />
          <Box>
            <List
              sx={{
                ':first-of-type': {
                  marginTop: 2,
                },
              }}
            >
              <ListItem button onClick={() => changeTab(Tabs.HOME)}>
                <ListItemIcon>
                  <HomeIcon />
                </ListItemIcon>
                <ListItemText primary="Início" />
              </ListItem>
            </List>
            <Divider />
            <List>
              <ListItem
                button
                onClick={() => changeTab(Tabs.PONTOS_TURISTICOS)}
              >
                <ListItemIcon>
                  <TheatersIcon color={categoryColorOf('ATTRACTION')} />
                </ListItemIcon>
                <ListItemText primary="Pontos Turísticos" />
              </ListItem>
              <ListItem button onClick={() => changeTab(Tabs.CULTURA)}>
                <ListItemIcon>
                  <TheaterComedyIcon color={categoryColorOf('CULTURE')} />
                </ListItemIcon>
                <ListItemText primary="Cultura" />
              </ListItem>
              <ListItem button onClick={() => changeTab(Tabs.POINT)}>
                <ListItemIcon>
                  <LocationCityIcon color={categoryColorOf('LANDMARK')} />
                </ListItemIcon>
                <ListItemText primary="Point da Cidade" />
              </ListItem>
              <ListItem button onClick={() => changeTab(Tabs.PERSONALIDADES)}>
                <ListItemIcon>
                  <HolidayVillageIcon color={categoryColorOf('COMMUNITY')} />
                </ListItemIcon>
                <ListItemText primary="Personalidades e Comunidades" />
              </ListItem>
            </List>
            <Divider />
            <List>
              <ListItem button onClick={() => changeTab(Tabs.VISITAS)}>
                <ListItemIcon>
                  <AccountTreeIcon />
                </ListItemIcon>
                <ListItemText primary="Ver histórico de visitas" />
              </ListItem>
              <ListItem button onClick={handleCreatVisit}>
                <ListItemIcon>
                  <AddIcon />
                </ListItemIcon>
                <ListItemText primary="Registrar visita" />
              </ListItem>
            </List>
            {isAdmin && (
              <>
                <Divider />
                <List>
                  <ListItem button onClick={handleCreatePicture}>
                    <ListItemIcon>
                      <AddIcon />
                    </ListItemIcon>
                    <ListItemText primary="Cadastrar uma figura" />
                  </ListItem>
                </List>
              </>
            )}
          </Box>
        </Drawer>

        <Box
          pl={{
            xl: 4,
            lg: 4,
            md: 4,
            sm: 4,
            xs: 1,
          }}
          pr={{
            xl: 4,
            lg: 4,
            md: 4,
            sm: 4,
            xs: 1,
          }}
          pt={4}
          pb={4}
          mt={8}
          sx={{
            width: '100%',
            flexWrap: 'wrap',
          }}
          display="flex"
          flexDirection="column"
        >
          {getCurrentTab() === Tabs.HOME && (
            <>
              <Typography variant="h4" component="div">
                {isAdmin
                  ? 'Seja bem-vindo ao Painel do Administrador!'
                  : 'Seja bem-vindo ao seu Álbum Digital!'}
              </Typography>
              <Divider
                sx={{
                  margin: '8px 0px',
                }}
              />
              <Typography variant="h6" component="div">
                Início
              </Typography>

              <Typography variant="body1" component="label">
                Visualize a listagem de todas as figuras cadastradas neste
                momento na lista abaixo:
              </Typography>

              <FormControl
                sx={{
                  marginTop: 2,
                  marginBottom: 2,
                }}
              >
                <InputLabel htmlFor="title">Buscar por título...</InputLabel>
                <Input
                  fullWidth
                  {...(registerFilterPicture('title') as InputProps)}
                  endAdornment={
                    <InputAdornment position="end">
                      <Search />
                    </InputAdornment>
                  }
                />
              </FormControl>

              <PicturesList
                onFullScreen={showImageFullScreen}
                onVisit={handleCreateVisitForEspecificPicture}
                filter={pictureFilters}
                onEdit={handleEditPicture}
                onDelete={handleDeletePicture}
              />
            </>
          )}
          {getCurrentTab() === Tabs.PONTOS_TURISTICOS && (
            <>
              <Typography variant="h4" component="div">
                Pontos Turísticos
              </Typography>
              <Typography variant="body1" component="label">
                Visualize a listagem de todas as figuras de Pontos Turísticos na
                lista abaixo:
              </Typography>
              <Divider
                sx={{
                  margin: '8px 0px',
                }}
              />
              <FormControl
                sx={{
                  marginTop: 2,
                  marginBottom: 2,
                }}
              >
                <InputLabel htmlFor="title">Buscar por título...</InputLabel>
                <Input
                  fullWidth
                  {...(registerFilterPicture('title') as InputProps)}
                  endAdornment={
                    <InputAdornment position="end">
                      <Search />
                    </InputAdornment>
                  }
                />
              </FormControl>
              <PicturesList
                onFullScreen={showImageFullScreen}
                onVisit={handleCreateVisitForEspecificPicture}
                filter={pictureFilters}
                onEdit={handleEditPicture}
                onDelete={handleDeletePicture}
                filterBy="ATTRACTION"
              />
            </>
          )}
          {getCurrentTab() === Tabs.CULTURA && (
            <>
              <Typography variant="h4" component="div">
                Cultura
              </Typography>
              <Typography variant="body1" component="label">
                Visualize a listagem de todas as figuras de Pontos Culturais na
                lista abaixo:
              </Typography>
              <Divider
                sx={{
                  margin: '8px 0px',
                }}
              />
              <FormControl
                sx={{
                  marginTop: 2,
                  marginBottom: 2,
                }}
              >
                <InputLabel htmlFor="title">Buscar por título...</InputLabel>
                <Input
                  fullWidth
                  {...(registerFilterPicture('title') as InputProps)}
                  endAdornment={
                    <InputAdornment position="end">
                      <Search />
                    </InputAdornment>
                  }
                />
              </FormControl>
              <PicturesList
                onFullScreen={showImageFullScreen}
                onVisit={handleCreateVisitForEspecificPicture}
                filter={pictureFilters}
                onEdit={handleEditPicture}
                onDelete={handleDeletePicture}
                filterBy="CULTURE"
              />
            </>
          )}
          {getCurrentTab() === Tabs.POINT && (
            <>
              <Typography variant="h4" component="div">
                Point da Cidade
              </Typography>
              <Typography variant="body1" component="label">
                Visualize a listagem de todas as figuras de Points da Cidade na
                lista abaixo:
              </Typography>
              <Divider
                sx={{
                  margin: '8px 0px',
                }}
              />
              <FormControl
                sx={{
                  marginTop: 2,
                  marginBottom: 2,
                }}
              >
                <InputLabel htmlFor="title">Buscar por título...</InputLabel>
                <Input
                  fullWidth
                  {...(registerFilterPicture('title') as InputProps)}
                  endAdornment={
                    <InputAdornment position="end">
                      <Search />
                    </InputAdornment>
                  }
                />
              </FormControl>
              <PicturesList
                onFullScreen={showImageFullScreen}
                onVisit={handleCreateVisitForEspecificPicture}
                filter={pictureFilters}
                onEdit={handleEditPicture}
                onDelete={handleDeletePicture}
                filterBy="LANDMARK"
              />
            </>
          )}
          {getCurrentTab() === Tabs.PERSONALIDADES && (
            <>
              <Typography variant="h4" component="div">
                Personalidades e Comunidades
              </Typography>
              <Typography variant="body1" component="label">
                Visualize a listagem de todas as figuras de Personalidades e
                Comunidades na lista abaixo:
              </Typography>
              <Divider
                sx={{
                  margin: '8px 0px',
                }}
              />
              <FormControl
                sx={{
                  marginTop: 2,
                  marginBottom: 2,
                }}
              >
                <InputLabel htmlFor="title">Buscar por título...</InputLabel>
                <Input
                  fullWidth
                  {...(registerFilterPicture('title') as InputProps)}
                  endAdornment={
                    <InputAdornment position="end">
                      <Search />
                    </InputAdornment>
                  }
                />
              </FormControl>
              <PicturesList
                onFullScreen={showImageFullScreen}
                onVisit={handleCreateVisitForEspecificPicture}
                filter={pictureFilters}
                onEdit={handleEditPicture}
                onDelete={handleDeletePicture}
                filterBy="COMMUNITY"
              />
            </>
          )}
          {getCurrentTab() === Tabs.VISITAS && (
            <>
              <Typography variant="h4" component="div">
                Histórico de Visitas
              </Typography>
              <Divider
                sx={{
                  margin: '8px 0px',
                }}
              />
              <FormControl
                sx={{
                  marginTop: 2,
                  marginBottom: 2,
                }}
              >
                <InputLabel htmlFor="pictureTitle">
                  Buscar por título de figura...
                </InputLabel>
                <Input
                  fullWidth
                  {...(registerFilterVisit('pictureTitle') as InputProps)}
                  endAdornment={
                    <InputAdornment position="end">
                      <Search />
                    </InputAdornment>
                  }
                />
              </FormControl>
              <VisitList filter={visitFilters} />
            </>
          )}
          <Footer />
        </Box>
      </Box>
      <Box
        sx={{
          display: {
            xl: 'none',
            lg: 'none',
            md: 'initial',
            sm: 'initial',
            xs: 'initial',
          },
          position: 'fixed',
          bottom: '0',
          left: 0,
          width: '100vw',
        }}
      >
        <BottomNavigation
          showLabels
          value={getCurrentTab()}
          onChange={(_, newValue) => {
            if (newValue === Tabs.CRIAR_FIGURA) {
              handleCreatePicture()
            } else if (newValue === Tabs.CRIAR_VISITA) {
              handleCreatVisit()
            } else {
              changeTab(newValue)
            }
          }}
        >
          <BottomNavigationAction
            value={Tabs.HOME}
            label="Início"
            icon={<HomeIcon />}
          />
          <BottomNavigationAction
            value={Tabs.VISITAS}
            label="Visitas"
            icon={<AccountTreeIcon />}
          />
          <BottomNavigationAction
            value={Tabs.CRIAR_VISITA}
            label="Registrar Visita"
            icon={<AddIcon />}
          />
          {isAdmin && (
            <BottomNavigationAction
              value={Tabs.CRIAR_FIGURA}
              label="Criar Figura"
              icon={<AddIcon />}
            />
          )}
        </BottomNavigation>
      </Box>

      <ReadQRCodeModal ref={readQRCodeModal} />
      <ConfirmDialogue ref={confirmDialogue} />
      {isAdmin && (
        <PictureModal
          onClose={() => setPictureFilters({})}
          ref={pictureModal}
        />
      )}
      {isAdmin && (
        <EditPictureModal
          onClose={() => setPictureFilters({})}
          ref={editPictureModal}
        />
      )}
      <ShowImageModal ref={showImageModal} />
      {pictureId && <VisitModal ref={visitModal} pictureId={pictureId} />}
    </Grid>
  )
}

export default Homepage
