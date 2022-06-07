import api from '../api'
import {Picture} from '../entities/Picture'
import {PathBuilder} from '../utils/PathBuilder'
import {getLocalStorage, setLocalStorage} from './StorageService'

export const PATH = '/picture'
const MULTIPART_FORM_TYPE = 'multipart/form-data'
const FLIPPED_PICTURES_LOCAL_NAME = 'flippedCards'

export interface Filter {
  title?: string
}

export class PictureService {
  toMultipartForm(picture: Picture): FormData {
    const {category, description, title, image, author} = picture
    const formData = new FormData()
    formData.append('title', title)
    formData.append('description', description)
    formData.append('category', category)
    formData.append('author', author)
    if (image) formData.append('image', image)
    return formData
  }

  async fetch(filter?: Filter): Promise<Picture[]> {
    const {data: pictures} = await api.get<Array<Picture>>(
      new PathBuilder(PATH).addQuery('title', filter?.title).build()
    )
    return pictures
  }

  async create(picture: Picture): Promise<Picture> {
    const {data: createdPicture} = await api.post<Picture>(
      new PathBuilder(PATH).build(),
      this.toMultipartForm(picture),
      {headers: {'Content-Type': MULTIPART_FORM_TYPE}}
    )
    return createdPicture
  }

  async update(id: string, picture: Picture): Promise<Picture> {
    const {data: updatedPicture} = await api.patch<Picture>(
      new PathBuilder(PATH).addPath(id).build(),
      this.toMultipartForm(picture),
      {headers: {'Content-Type': MULTIPART_FORM_TYPE}}
    )
    return updatedPicture
  }

  async findById(id: string): Promise<Picture | undefined> {
    const {data: picture} = await api.get<Picture | undefined>(
      new PathBuilder(PATH).addPath(id).build()
    )
    let pictureWithImage: Picture | undefined
    if (picture && picture.filename) {
      const {data: imageFile} = await api
        .get<File | undefined>(
          new PathBuilder('images').addPath(picture.filename).build()
        )
        .catch(() => {
          return {data: undefined}
        })
      pictureWithImage = {...picture, image: imageFile}
    }
    return pictureWithImage
  }

  async delete(id: string): Promise<boolean> {
    const {data: wasDeleted} = await api.delete<Picture>(
      new PathBuilder(PATH).addPath(id).build()
    )
    return !!wasDeleted.id
  }

  flipPicture(id: string): string {
    const flippedPictures = this.getFlippedPictures()
    if (!flippedPictures.includes(id)) {
      setLocalStorage(FLIPPED_PICTURES_LOCAL_NAME, [...flippedPictures, id])
    }
    return id
  }

  getFlippedPictures(): Array<string> {
    const flippedPictures = getLocalStorage<Array<string>>(
      FLIPPED_PICTURES_LOCAL_NAME
    )
    if (flippedPictures === undefined) {
      setLocalStorage(FLIPPED_PICTURES_LOCAL_NAME, [])
      return []
    }
    return flippedPictures
  }
}
