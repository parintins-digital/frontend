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
  Divider,
  Drawer,
  Grid,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Toolbar,
  Typography,
} from '@mui/material'
import {useContext, useRef} from 'react'
import {useParams} from 'react-router-dom'
import ConfirmDialogue, {
  ConfirmDialogueProps,
} from '../../components/Dialogue/ConfirmDialogue'
import Footer from '../../components/Footer'
import Header from '../../components/Header'
import EditPictureModal, {
  EditPictureProps,
} from '../../components/Modal/EditPictureModal'
import PictureModal, {PictureProps} from '../../components/Modal/PictureModal'
import VisitModal, {VisitProps} from '../../components/Modal/VisitModal'
import PicturesList from '../../components/PicturesList'
import VisitList from '../../components/VisitList'
import {ToastContext} from '../../contexts/Toast'
import {useLoading} from '../../hooks/useLoading'
import {useTab} from '../../hooks/useTab'
import {PictureService} from '../../services/PictureService'

enum Tabs {
  HOME,
  PONTOS_TURISTICOS,
  CULTURA,
  POINT,
  PERSONALIDADES,
  VISITAS,
  CRIAR_FIGURA,
}

const pictureService = new PictureService()

const Homepage: React.FC = () => {
  const {pictureId} = useParams()
  const {changeTab, getCurrentTab} = useTab(Tabs.HOME)
  const pictureModal = useRef<PictureProps>(null)
  const editPictureModal = useRef<EditPictureProps>(null)
  const confirmDialogue = useRef<ConfirmDialogueProps>(null)
  const visitModal = useRef<VisitProps>(null)
  const {showToast} = useContext(ToastContext)
  const deletePictureLoading = useLoading(
    deletePicture,
    'Aguarde um momento. Deletando figura...',
    false
  )

  function handleCreatePicture() {
    pictureModal.current?.open()
  }

  function handleEditPicture(id: string) {
    editPictureModal.current?.open(id)
  }

  function handleDeletePicture(id: string) {
    console.log(id)
    confirmDialogue.current?.open(
      console.log,
      'Você deseja excluir esta figura?'
    )
    // confirmDialogue.current?.open((response) => {
    //   if (response) {
    //     deletePictureLoading(id)
    //   }
    // }, 'Você deseja excluir esta figura?')
  }

  async function deletePicture(id: string) {
    try {
      await pictureService.delete(id)
      showToast('Figura deletada com sucesso.', 'success')
    } catch {
      showToast('Erro ao deletar figura. Por favor, tente novamente.', 'error')
    }
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
                  <TheatersIcon />
                </ListItemIcon>
                <ListItemText primary="Pontos Turísticos" />
              </ListItem>
              <ListItem button onClick={() => changeTab(Tabs.CULTURA)}>
                <ListItemIcon>
                  <TheaterComedyIcon />
                </ListItemIcon>
                <ListItemText primary="Cultura" />
              </ListItem>
              <ListItem button onClick={() => changeTab(Tabs.POINT)}>
                <ListItemIcon>
                  <LocationCityIcon />
                </ListItemIcon>
                <ListItemText primary="Point da Cidade" />
              </ListItem>
              <ListItem button onClick={() => changeTab(Tabs.PERSONALIDADES)}>
                <ListItemIcon>
                  <HolidayVillageIcon />
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
            </List>
            <Divider />
            <List>
              <ListItem button onClick={handleCreatePicture}>
                <ListItemIcon>
                  <AddIcon />
                </ListItemIcon>
                <ListItemText primary="Cadastrar uma figura" />
              </ListItem>
            </List>
          </Box>
        </Drawer>

        <Box p={4} mt={8} display="flex" flexDirection="column">
          {getCurrentTab() === Tabs.HOME && (
            <>
              <Typography variant="h4" component="div">
                Seja bem-vindo ao seu Álbum Digital!
              </Typography>
              <Divider
                sx={{
                  margin: '8px 0px',
                }}
              />
              <Typography variant="h6" component="div">
                Início
              </Typography>

              <PicturesList
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
              <Divider
                sx={{
                  margin: '8px 0px',
                }}
              />

              <PicturesList
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
              <Divider
                sx={{
                  margin: '8px 0px',
                }}
              />
              <PicturesList
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
              <Divider
                sx={{
                  margin: '8px 0px',
                }}
              />
              <PicturesList
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
              <Divider
                sx={{
                  margin: '8px 0px',
                }}
              />
              <PicturesList
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
              <VisitList />
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
          width: '100vw',
        }}
      >
        <BottomNavigation
          showLabels
          value={getCurrentTab()}
          onChange={(_, newValue) => {
            if (newValue === Tabs.CRIAR_FIGURA) {
              handleCreatePicture()
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
            value={Tabs.CRIAR_FIGURA}
            label="Criar Figura"
            icon={<AddIcon />}
          />
        </BottomNavigation>
      </Box>

      <ConfirmDialogue ref={confirmDialogue} />
      <PictureModal ref={pictureModal} />
      <EditPictureModal ref={editPictureModal} />
      {pictureId && <VisitModal ref={visitModal} pictureId={pictureId} />}
    </Grid>
  )
}

export default Homepage
