export type CategoryType = 'ATTRACTION' | 'CULTURE' | 'LANDMARK' | 'COMMUNITY'

export interface Picture {
  id?: string
  title: string
  description: string
  image?: File
  filename?: string
  category: CategoryType
  createdAt?: Date
}
