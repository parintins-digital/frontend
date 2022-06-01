import api from '../api'
import {Picture} from '../entities/Picture'
import {PathBuilder} from '../utils/PathBuilder'

export const PATH = '/picture'
const MULTIPART_FORM_TYPE = 'multipart/form-data'

export interface Filter {
  title?: string
}

export class PictureService {
  toMultipartForm(picture: Picture): FormData {
    const {category, description, title, image} = picture
    const formData = new FormData()
    formData.append('title', title)
    formData.append('description', description)
    formData.append('category', category)
    if (image) formData.append('image', image)
    return formData
  }

  async fetch(filter?: Filter): Promise<Picture[]> {
    const {data: pictures} = await api.get<Array<Picture>>(
      new PathBuilder(PATH).addQuery('title', filter?.title).build()
    )
    const picturesWithImages: Array<Picture> = []
    for (const picture of pictures) {
      const {data: imageFile} = await api.get<File>(
        new PathBuilder('images')
          .addPath(picture.category)
          .addPath(`${picture.id}`)
          .build()
      )
      picturesWithImages.push({
        ...picture,
        image: imageFile,
      })
    }
    return picturesWithImages
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
    if (picture) {
      const {data: imageFile} = await api.get<File>(
        new PathBuilder('images')
          .addPath(picture.category)
          .addPath(`${picture.id}`)
          .build()
      )
      pictureWithImage = {...picture, image: imageFile}
    }
    return pictureWithImage
  }
  async delete(id: string): Promise<boolean> {
    const {data: wasDeleted} = await api.delete<Picture>(
      new PathBuilder().addPath(id).build()
    )
    return !!wasDeleted.id
  }
}
