import {Download} from '@mui/icons-material'
import DeleteIcon from '@mui/icons-material/Delete'
import EditIcon from '@mui/icons-material/Edit'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import {Button} from '@mui/material'
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
import {DOMAIN} from '../../Constants'
import {Picture as PictureEntity} from '../../entities/Picture'
import {useAuth} from '../../hooks/useAuth'
import {PathBuilder} from '../../utils/PathBuilder'
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
  picture: PictureEntity
}

const Picture: React.FC<Props> = ({picture, onDelete, onEdit}: Props) => {
  const [expanded, setExpanded] = useState(false)
  const {isAdmin} = useAuth()

  const qrCodeURL = new PathBuilder(DOMAIN)
    .addPath('homepage')
    .addPath(picture.id || picture.title)
    .build()

  const handleExpandClick = () => {
    setExpanded(!expanded)
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

  return (
    <Card sx={{maxWidth: 345}} draggable={false}>
      <CardMedia
        component="img"
        height="100"
        image={
          picture.image ? URL.createObjectURL(picture.image) : DefaultPicture
        }
        alt={picture.title}
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {picture.title}
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
