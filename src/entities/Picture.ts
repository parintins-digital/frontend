export type CategoryType = 'ATTRACTION' | 'CULTURE' | 'LANDMARK' | 'COMMUNITY'

export interface Picture {
  id?: string
  title: string
  description: string
  image?: File
  category: CategoryType
  createdAt?: Date
}
