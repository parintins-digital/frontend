import {styled} from '@mui/material/styles'
import Card from '@mui/material/Card'
import CardMedia from '@mui/material/CardMedia'
import CardContent from '@mui/material/CardContent'
import CardActions from '@mui/material/CardActions'
import Collapse from '@mui/material/Collapse'
import IconButton, {IconButtonProps} from '@mui/material/IconButton'
import Typography from '@mui/material/Typography'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import {Picture as PictureEntity} from '../../entities/Picture'
import {QRCodeCanvas} from 'qrcode.react'

interface ExpandMoreProps extends IconButtonProps {
  expand: boolean
}

import DefaultPicture from '../../assets/DefaultPicture.svg'
import {Download} from '@mui/icons-material'
import {useState} from 'react'
import {DOMAIN} from '../../Constants'
import {PathBuilder} from '../../utils/PathBuilder'

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
  picture: PictureEntity
}

const Picture: React.FC<Props> = ({picture}: Props) => {
  const [expanded, setExpanded] = useState(false)

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
    <Card sx={{maxWidth: 345}}>
      <CardMedia
        component="img"
        height="194"
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
      <CardActions disableSpacing>
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
            <QRCodeCanvas value={qrCodeURL} />
          </div>
          <CardActions disableSpacing>
            <IconButton onClick={downloadQRCode} aria-label="Download QRCode">
              <Download />
            </IconButton>
          </CardActions>
        </CardContent>
      </Collapse>
    </Card>
  )
}

export default Picture
