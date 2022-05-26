import Card from '@mui/material/Card'
import CardMedia from '@mui/material/CardMedia'
import CardContent from '@mui/material/CardContent'
import Typography from '@mui/material/Typography'
import {Visit as VisitEntity} from '../../entities/Visit'

import {useEffect, useState} from 'react'
import {Picture} from '../../entities/Picture'
import {PictureService} from '../../services/PictureService'
import {dateFrom} from '../../utils/FormatDateTime'

interface Props {
  visit: VisitEntity
}

import DefaultPicture from '../../assets/DefaultPicture.svg'
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

  return (
    <Card sx={{maxWidth: 345}}>
      <Card sx={{maxWidth: 345}}>
        {picture && (
          <CardMedia
            component="img"
            height="194"
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
    </Card>
  )
}

export default Visit
