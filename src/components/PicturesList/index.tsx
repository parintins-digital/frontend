import {useEffect, useState} from 'react'
import {CategoryType, Picture as PictureEntity} from '../../entities/Picture'
import TabArea from '../TabArea'
import {PictureService} from '../../services/PictureService'
import Picture from '../Picture'
import {useLoading} from '../../hooks/useLoading'

interface Props {
  filterBy?: CategoryType
}

const pictureService = new PictureService()

const PicturesList: React.FC<Props> = ({filterBy}: Props) => {
  const [pictures, setPictures] = useState<Array<PictureEntity>>([])
  const handleFetch = useLoading(fetch, 'Buscando figuras cadastradas...')

  function renderPicture(picture: PictureEntity) {
    return <Picture key={picture.id || picture.title} picture={picture} />
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
