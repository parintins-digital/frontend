import {Badge, Fade} from '@mui/material'
import {useEffect, useState} from 'react'
import {
  categoryColorOf,
  CategoryType,
  Picture as PictureEntity,
} from '../../entities/Picture'
import {useLoading} from '../../hooks/useLoading'
import {Filter, PictureService} from '../../services/PictureService'
import Picture from '../Picture'
import TabArea from '../TabArea'

interface Props {
  onEdit: (id: string) => void
  onDelete: (id: string) => void
  onVisit: (picture: PictureEntity) => void
  onFullScreen: (picture: PictureEntity) => void
  filterBy?: CategoryType
  filter?: Filter
}

const pictureService = new PictureService()

const PicturesList: React.FC<Props> = ({
  filterBy,
  filter = {},
  onDelete,
  onEdit,
  onVisit,
  onFullScreen,
}: Props) => {
  const [pictures, setPictures] = useState<Array<PictureEntity>>([])
  const handleFetch = useLoading(fetch, 'Buscando figuras cadastradas...')

  function renderPicture(picture: PictureEntity, index: number) {
    return (
      <Fade in timeout={index * 500} key={picture.id || picture.title}>
        <Badge
          color={categoryColorOf(picture.category)}
          badgeContent={`${index + 1}`}
        >
          <Picture
            onFullScreen={onFullScreen}
            onVisit={onVisit}
            onDelete={onDelete}
            onEdit={onEdit}
            picture={picture}
          />
        </Badge>
      </Fade>
    )
  }

  useEffect(() => {
    handleFetch()
  }, [filter])

  async function fetch() {
    const newPictures = await pictureService.fetch(filter)
    if (filterBy) {
      const filteredPictures = newPictures.filter(
        (pic) => pic.category === filterBy
      )
      setPictures(filteredPictures)
    } else {
      setPictures(newPictures)
    }
  }
  return <TabArea>{pictures.map(renderPicture)}</TabArea>
}

export default PicturesList
