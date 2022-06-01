import api from '../api'
import {Visit} from '../entities/Visit'
import {PathBuilder} from '../utils/PathBuilder'

export const PATH = '/user/visit'

export interface Filter {
  pictureTitle?: string
}

export class VisitService {
  async fetch(filter?: Filter): Promise<Array<Visit>> {
    const {data: visits} = await api.get(
      new PathBuilder(PATH).addQuery('title', filter?.pictureTitle).build()
    )
    return visits
  }

  async create(visit: Visit): Promise<Visit> {
    const {data: createdVisit} = await api.post(
      new PathBuilder(PATH).build(),
      visit
    )
    return createdVisit
  }
}
