import {
  AppBar,
  Button,
  Divider,
  Drawer,
  Grid,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Toolbar,
} from '@mui/material'

import TheaterComedyIcon from '@mui/icons-material/TheaterComedy'
import LogoutIcon from '@mui/icons-material/Logout'
import TheatersIcon from '@mui/icons-material/Theaters'
import LocationCityIcon from '@mui/icons-material/LocationCity'
import HolidayVillageIcon from '@mui/icons-material/HolidayVillage'
import HomeIcon from '@mui/icons-material/Home'
import AddIcon from '@mui/icons-material/Add'

import LogoImage from '../../assets/Logo-v2.png'
import {useNavigate} from 'react-router-dom'
import {Box} from '@mui/system'
import {Label} from '@mui/icons-material'

const Homepage: React.FC = () => {
  const navigate = useNavigate()

  function handleLogout() {
    navigate('/')
  }

  return (
    <Grid container>
      <AppBar>
        <Toolbar>
          <img
            src={LogoImage}
            alt="Logo"
            style={{
              width: '100px',
              height: 'auto',
            }}
          />
          <Button
            variant="contained"
            color="secondary"
            onClick={handleLogout}
            startIcon={<LogoutIcon />}
            sx={{
              marginLeft: 'auto',
            }}
          >
            Sair
          </Button>
        </Toolbar>
      </AppBar>

      <Grid container>
        <Grid
          item
          lg={4}
          sx={{
            zIndex: 0,
          }}
        >
          <Drawer variant="permanent">
            <Toolbar />
            <Box sx={{overflow: 'auto'}}>
              <List
                sx={{
                  ':first-child': {
                    marginTop: 2,
                  },
                }}
              >
                <ListItem button>
                  <ListItemIcon>
                    <HomeIcon />
                  </ListItemIcon>
                  <ListItemText primary="Início" />
                </ListItem>
              </List>
              <Divider />
              <List>
                <ListItem button>
                  <ListItemIcon>
                    <TheatersIcon />
                  </ListItemIcon>
                  <ListItemText primary="Pontos Turísticos" />
                </ListItem>
                <ListItem button>
                  <ListItemIcon>
                    <TheaterComedyIcon />
                  </ListItemIcon>
                  <ListItemText primary="Cultura" />
                </ListItem>
                <ListItem button>
                  <ListItemIcon>
                    <LocationCityIcon />
                  </ListItemIcon>
                  <ListItemText primary="Point da Cidade" />
                </ListItem>
                <ListItem button>
                  <ListItemIcon>
                    <HolidayVillageIcon />
                  </ListItemIcon>
                  <ListItemText primary="Personalidades e Comunidades" />
                </ListItem>
              </List>
              <Divider />
              <List>
                <ListItem button>
                  <ListItemIcon>
                    <TheaterComedyIcon />
                  </ListItemIcon>
                  <ListItemText primary="Ver lista de figuras" />
                </ListItem>
                <ListItem button>
                  <ListItemIcon>
                    <TheaterComedyIcon />
                  </ListItemIcon>
                  <ListItemText primary="Ver histórico de visitas" />
                </ListItem>
              </List>
              <Divider />
              <List>
                <ListItem button>
                  <ListItemIcon>
                    <AddIcon />
                  </ListItemIcon>
                  <ListItemText primary="Cadastrar uma figura" />
                </ListItem>
                <ListItem button>
                  <ListItemIcon>
                    <TheaterComedyIcon />
                  </ListItemIcon>
                  <ListItemText primary="Registrar uma visita" />
                </ListItem>
              </List>
            </Box>
          </Drawer>
        </Grid>

        <Grid
          item
          lg={8}
        >
          <Label>Ola</Label>
        </Grid>
      </Grid>
    </Grid>
  )
}

export default Homepage
