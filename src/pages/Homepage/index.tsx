import {
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

import TheaterComedyIcon from '@mui/icons-material/TheaterComedy'
import TheatersIcon from '@mui/icons-material/Theaters'
import LocationCityIcon from '@mui/icons-material/LocationCity'
import HolidayVillageIcon from '@mui/icons-material/HolidayVillage'
import HomeIcon from '@mui/icons-material/Home'
import AddIcon from '@mui/icons-material/Add'
import AccountTreeIcon from '@mui/icons-material/AccountTree'

import {useTab} from '../../hooks/useTab'
import PictureModal, {PictureProps} from '../../components/Modal/PictureModal'
import {useRef} from 'react'
import PicturesList from '../../components/PicturesList'
import VisitList from '../../components/VisitList'
import Header from '../../components/Header'
import Footer from '../../components/Footer'

enum Tabs {
  HOME,
  PONTOS_TURISTICOS,
  CULTURA,
  POINT,
  PERSONALIDADES,
  VISITAS,
}

const Homepage: React.FC = () => {
  const pictureModal = useRef<PictureProps>(null)
  const {changeTab, getCurrentTab} = useTab(Tabs.HOME)

  function handleCreatePicture() {
    pictureModal.current?.open()
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

              <PicturesList />
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

              <PicturesList filterBy="ATTRACTION" />
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
              <PicturesList filterBy="CULTURE" />
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
              <PicturesList filterBy="LANDMARK" />
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
              <PicturesList filterBy="COMMUNITY" />
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
      <PictureModal ref={pictureModal} />
    </Grid>
  )
}

export default Homepage
