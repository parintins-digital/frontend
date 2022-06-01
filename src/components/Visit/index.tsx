import TimelineContent from '@mui/lab/TimelineContent'
import {Skeleton} from '@mui/material'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import CardMedia from '@mui/material/CardMedia'
import Typography from '@mui/material/Typography'
import {useEffect, useState} from 'react'
import DefaultPicture from '../../assets/DefaultPicture.svg'
import {Picture} from '../../entities/Picture'
import {Visit as VisitEntity} from '../../entities/Visit'
import {PictureService} from '../../services/PictureService'
import {dateFrom} from '../../utils/FormatDateTime'

interface Props {
  visit: VisitEntity
}

const pictureService = new PictureService()

const Visit: React.FC<Props> = ({visit}: Props) => {
  const [picture, setPicture] = useState<Picture>()

  useEffect(() => {
    findPicture()
  }, [])

  async function findPicture() {
    const newPicture = await pictureService.findById(visit.pictureId)
    setPicture(newPicture)
  }

  if (!picture)
    return (
      <TimelineContent>
        <Skeleton variant="rectangular" height={100} />
        <Skeleton variant="text" />
      </TimelineContent>
    )

  return (
    <TimelineContent>
      <Card sx={{maxWidth: 345}}>
        {picture && (
          <CardMedia
            component="img"
            height="100"
            image={
              picture.image
                ? URL.createObjectURL(picture.image)
                : DefaultPicture
            }
            alt={picture.title}
          />
        )}
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            Você visitou {picture?.title} no dia{' '}
            {dateFrom(new Date(visit.visitedOn))}
          </Typography>
        </CardContent>
      </Card>
    </TimelineContent>
  )
}

export default Visit
