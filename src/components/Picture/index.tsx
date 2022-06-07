import {Download, QrCode} from '@mui/icons-material'
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome'
import DeleteIcon from '@mui/icons-material/Delete'
import EditIcon from '@mui/icons-material/Edit'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import FullscreenIcon from '@mui/icons-material/Fullscreen'
import {Button, Chip} from '@mui/material'
import Card from '@mui/material/Card'
import CardActions from '@mui/material/CardActions'
import CardContent from '@mui/material/CardContent'
import CardMedia from '@mui/material/CardMedia'
import Collapse from '@mui/material/Collapse'
import IconButton, {IconButtonProps} from '@mui/material/IconButton'
import {styled} from '@mui/material/styles'
import Typography from '@mui/material/Typography'
import {QRCodeCanvas} from 'qrcode.react'
import {useState} from 'react'
import DefaultPicture from '../../assets/DefaultPicture.svg'
import {colors} from '../../colors'
import {API_URL, DOMAIN} from '../../Constants'
import {
  categoryColorOf,
  categoryNameOf,
  Picture as PictureEntity,
} from '../../entities/Picture'
import {useAuth} from '../../hooks/useAuth'
import {PictureService} from '../../services/PictureService'
import {PathBuilder} from '../../utils/PathBuilder'
import {CardNotFlipped, FullScreenWrapper} from './styles'
interface ExpandMoreProps extends IconButtonProps {
  expand: boolean
}

const ExpandMore = styled((props: ExpandMoreProps) => {
  const {expand, ...other} = props
  return <IconButton {...other} />
})(({theme, expand}) => ({
  transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
  marginLeft: 'auto',
  transition: theme.transitions.create('transform', {
    duration: theme.transitions.duration.shortest,
  }),
}))

interface Props {
  onDelete: (id: string) => void
  onEdit: (id: string) => void
  onVisit: (picture: PictureEntity) => void
  onFullScreen: (picture: PictureEntity) => void
  picture: PictureEntity
}

const pictureService = new PictureService()

const Picture: React.FC<Props> = ({
  picture,
  onDelete,
  onEdit,
  onVisit,
  onFullScreen,
}: Props) => {
  const flippedPictures = pictureService.getFlippedPictures()
  const [expanded, setExpanded] = useState(false)
  const {isAdmin} = useAuth()
  const [flipped, setFlipped] = useState(
    !!(isAdmin || (picture.id && flippedPictures.includes(picture.id)))
  )

  const qrCodeURL = new PathBuilder(DOMAIN)
    .addPath('homepage')
    .addPath(picture.id || picture.title)
    .build()

  const handleExpandClick = () => {
    setExpanded(!expanded)
  }

  function handleFlip() {
    if (!picture.id) return
    pictureService.flipPicture(picture.id)
    setFlipped(true)
  }

  function downloadQRCode() {
    const canvas: any = document.querySelector(
      `.${picture.title}-${picture.id} > canvas`
    )
    const pngFile = canvas.toDataURL('image/png')
    const downloadLink = document.createElement('a')
    downloadLink.download = 'QRCode-' + picture.title
    downloadLink.href = `${pngFile}`
    downloadLink.click()
  }

  if (!isAdmin && !picture.currentUser?.visited) {
    return (
      <Card
        sx={{maxWidth: 300, display: 'flex', flexDirection: 'column'}}
        draggable={false}
      >
        <CardContent draggable={false}>
          <Typography variant="subtitle1" fontStyle="italic" color="GrayText">
            Você ainda não visitou este local.
          </Typography>
          <Typography gutterBottom variant="h5" component="div">
            {picture.title}
          </Typography>
          <Chip
            sx={{
              marginTop: '2px',
              marginBottom: '2px',
            }}
            label={categoryNameOf(picture.category)}
            color={categoryColorOf(picture.category)}
          />
          <Typography variant="subtitle1" fontStyle="italic" color="GrayText">
            Criado por {picture.author}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {picture.description}
          </Typography>
        </CardContent>
        <CardActions
          sx={{
            display: 'flex',
            justifyContent: 'center',
            background: colors.secondary,
            marginTop: 'auto',
          }}
        >
          <Button
            onClick={() => onVisit(picture)}
            startIcon={<QrCode />}
            variant="contained"
            color="secondary"
          >
            Registrar Visita
          </Button>
        </CardActions>
      </Card>
    )
  }

  if (!flipped && picture.currentUser?.visited) {
    return (
      <CardNotFlipped draggable={false} onClick={handleFlip}>
        <Card sx={{maxWidth: 300}} draggable={false}>
          <CardContent>
            <Typography variant="subtitle1" fontStyle="italic" color="GrayText">
              Você visitou {picture.title}.
            </Typography>
            <Typography gutterBottom variant="h5" component="h5">
              Clique aqui para desvirar
            </Typography>
            <AutoAwesomeIcon color="secondary" />
          </CardContent>
        </Card>
      </CardNotFlipped>
    )
  }

  return (
    <Card sx={{maxWidth: 300}} draggable={false}>
      <FullScreenWrapper onClick={() => onFullScreen(picture)}>
        <CardMedia
          component="img"
          height="200"
          draggable={false}
          image={
            picture.filename
              ? new PathBuilder(API_URL)
                  .addPath('images')
                  .addPath(picture.filename)
                  .build()
              : DefaultPicture
          }
          alt={picture.title}
        />
        <div className="clickarea">
          <FullscreenIcon />
        </div>
      </FullScreenWrapper>
      <CardContent draggable={false}>
        <Typography gutterBottom variant="h5" component="div">
          {picture.title}
        </Typography>
        <Chip
          sx={{
            marginTop: '2px',
            marginBottom: '2px',
          }}
          label={categoryNameOf(picture.category)}
          color={categoryColorOf(picture.category)}
        />
        <Typography variant="subtitle1" fontStyle="italic" color="GrayText">
          Criado por {picture.author}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {picture.description}
        </Typography>
      </CardContent>
      {isAdmin && (
        <>
          <CardActions disableSpacing>
            <Button
              onClick={() => {
                if (picture.id) onEdit(picture.id)
              }}
              color="primary"
              variant="text"
            >
              <EditIcon />
            </Button>
            <Button
              onClick={() => {
                if (picture.id) onDelete(picture.id)
              }}
              color="primary"
              variant="text"
            >
              <DeleteIcon />
            </Button>
            <ExpandMore
              expand={expanded}
              onClick={handleExpandClick}
              aria-expanded={expanded}
              aria-label="show more"
            >
              <ExpandMoreIcon />
            </ExpandMore>
          </CardActions>
          <Collapse in={expanded} timeout="auto" unmountOnExit>
            <CardContent
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
              }}
            >
              <Typography gutterBottom variant="body1" component="div">
                Faça o download do QRCode:
              </Typography>
              <div className={`${picture.title}-${picture.id}`}>
                <QRCodeCanvas
                  style={{
                    width: '150px',
                    height: 'auto',
                  }}
                  level="L"
                  size={500}
                  value={qrCodeURL}
                />
              </div>
              <CardActions disableSpacing>
                <IconButton
                  onClick={downloadQRCode}
                  aria-label="Download QRCode"
                >
                  <Download />
                </IconButton>
              </CardActions>
            </CardContent>
          </Collapse>
        </>
      )}
    </Card>
  )
}

export default Picture
