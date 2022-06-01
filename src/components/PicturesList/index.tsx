import {Badge} from '@mui/material'
import {useEffect, useState} from 'react'
import {CategoryType, Picture as PictureEntity} from '../../entities/Picture'
import {useLoading} from '../../hooks/useLoading'
import {PictureService} from '../../services/PictureService'
import Picture from '../Picture'
import TabArea from '../TabArea'

interface Props {
  onEdit: (id: string) => void
  onDelete: (id: string) => void
  filterBy?: CategoryType
}

const pictureService = new PictureService()

const PicturesList: React.FC<Props> = ({filterBy, onDelete, onEdit}: Props) => {
  const [pictures, setPictures] = useState<Array<PictureEntity>>([])
  const handleFetch = useLoading(fetch, 'Buscando figuras cadastradas...')

  function renderPicture(picture: PictureEntity, index: number) {
    return (
      <Badge
        color={badgeColorOf(picture.category)}
        badgeContent={`${index + 1}`}
        key={picture.id || picture.title}
      >
        <Picture onDelete={onDelete} onEdit={onEdit} picture={picture} />
      </Badge>
    )
  }

  function badgeColorOf(
    category: CategoryType
  ): 'warning' | 'primary' | 'secondary' | 'success' | 'error' | 'info' {
    if (category === 'ATTRACTION') return 'warning'
    else if (category === 'COMMUNITY') return 'info'
    else if (category === 'CULTURE') return 'secondary'
    else if (category === 'LANDMARK') return 'success'
    else return 'primary'
  }

  useEffect(() => {
    handleFetch()
  }, [])

  async function fetch() {
    const newPictures = await pictureService.fetch()
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
