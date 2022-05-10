import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Typography,
} from '@mui/material'
import {Picture} from '../../entities/Picture'

import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward'
import PrintIcon from '@mui/icons-material/Print'

interface Props {
  picture: Picture
}

const Picture: React.FC<Props> = ({picture}: Props) => {
  return (
    <Card sx={{maxWidth: 345}}>
      <CardMedia
        component="img"
        height="140"
        image="/static/images/cards/contemplative-reptile.jpg"
        alt="Imagem do Local"
      />
      <CardContent>
        <Typography
          gutterBottom
          variant="h5"
          component="div"
        >
          {picture.title}
        </Typography>
        <Typography
          variant="body2"
          color="text.secondary"
        >
          {picture.description}
        </Typography>
      </CardContent>
      <CardActions>
        <Button
          size="small"
          startIcon={<ArrowDownwardIcon />}
        >
          Download
        </Button>
        <Button
          size="small"
          startIcon={<PrintIcon />}
        >
          Imprimir QRCode
        </Button>
      </CardActions>
    </Card>
  )
}

export default Picture
