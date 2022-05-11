import api from '../api'
import {Visit} from '../entities/Visit'
import {PathBuilder} from '../utils/PathBuilder'

export const PATH = '/visit'

export class VisitService {
  async fetch(): Promise<Array<Visit>> {
    const {data: visits} = await api.get(new PathBuilder(PATH).build())
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
