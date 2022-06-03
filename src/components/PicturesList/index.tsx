import {Badge} from '@mui/material'
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
  filterBy?: CategoryType
  filter?: Filter
}

const pictureService = new PictureService()

const PicturesList: React.FC<Props> = ({
  filterBy,
  filter = {},
  onDelete,
  onEdit,
}: Props) => {
  const [pictures, setPictures] = useState<Array<PictureEntity>>([])
  const handleFetch = useLoading(fetch, 'Buscando figuras cadastradas...')

  function renderPicture(picture: PictureEntity, index: number) {
    return (
      <Badge
        color={categoryColorOf(picture.category)}
        badgeContent={`${index + 1}`}
        key={picture.id || picture.title}
      >
        <Picture onDelete={onDelete} onEdit={onEdit} picture={picture} />
      </Badge>
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
