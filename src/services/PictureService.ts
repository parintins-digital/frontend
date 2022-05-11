import api from '../api'
import {Picture} from '../entities/Picture'
import {PathBuilder} from '../utils/PathBuilder'

export const PATH = '/picture'
const MULTIPART_FORM_TYPE = 'multipart/form-data'
export class PictureService {
  toMultipartForm(picture: Picture): FormData {
    const {category, description, title, image} = picture
    const formData = new FormData()
    formData.append('title', title)
    formData.append('description', description)
    formData.append('description', description)
    formData.append('category', category)
    if (image) formData.append('image', image)
    return formData
  }

  async fetch(): Promise<Picture[]> {
    // const {data: pictures} = await api.get(new PathBuilder(PATH).build())
    // return pictures
    return [
      {
        id: '1112',
        category: 'ATTRACTION',
        title: 'teste',
        description: 'Aqui vai a descrição do local',
      },
      {
        id: '1113',
        category: 'CULTURE',
        title: 'teste',
        description: 'Aqui vai a descrição do local',
      },
      {
        id: '1114',
        category: 'COMMUNITY',
        title: 'teste',
        description: 'Aqui vai a descrição do local',
      },
      {
        id: '1115',
        category: 'LANDMARK',
        title: 'teste',
        description: 'Aqui vai a descrição do local',
      },
    ]
  }

  async create(picture: Picture): Promise<Picture> {
    const {data: createdPicture} = await api.post<Picture>(
      new PathBuilder(PATH).build(),
      this.toMultipartForm(picture),
      {headers: {'Content-Type': MULTIPART_FORM_TYPE}}
    )
    return createdPicture
  }

  async findById(id: string): Promise<Picture> {
    const {data: picture} = await api.get<Picture>(
      new PathBuilder(PATH).addPath(id).build()
    )
    return picture
  }

  async update(id: string, picture: Picture): Promise<Picture> {
    const {data: updatedPicture} = await api.patch<Picture>(
      new PathBuilder(PATH).addPath(id).build(),
      this.toMultipartForm(picture),
      {headers: {'Content-Type': MULTIPART_FORM_TYPE}}
    )
    return updatedPicture
  }

  async delete(id: string): Promise<boolean> {
    const {data: wasDeleted} = await api.delete<Picture>(
      new PathBuilder().addPath(id).build()
    )
    return !!wasDeleted.id
  }
}
