import TimelineContent from '@mui/lab/TimelineContent'
import {Skeleton} from '@mui/material'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import CardMedia from '@mui/material/CardMedia'
import Typography from '@mui/material/Typography'
import {useEffect, useState} from 'react'
import DefaultPicture from '../../assets/DefaultPicture.svg'
import {API_URL} from '../../Constants'
import {Picture} from '../../entities/Picture'
import {Visit as VisitEntity} from '../../entities/Visit'
import {PictureService} from '../../services/PictureService'
import {dateFrom} from '../../utils/FormatDateTime'
import {PathBuilder} from '../../utils/PathBuilder'

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
      <Card sx={{maxWidth: 300}}>
        {picture && (
          <CardMedia
            component="img"
            height="200"
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
        )}
        <CardContent>
          <Typography gutterBottom variant="h6" component="label">
            Você visitou {picture.title} no dia{' '}
            {dateFrom(new Date(visit.visitedOn))}
          </Typography>
        </CardContent>
      </Card>
    </TimelineContent>
  )
}

export default Visit
