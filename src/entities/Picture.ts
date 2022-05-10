export interface Picture {
  id: number
  title: string
  description: string
  image?: File
  category: 'ATTRACTION' | 'CULTURE' | 'LANDMARK' | 'COMMUNITY'
  createdAt: Date
}
