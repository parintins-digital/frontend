export type CategoryType = 'ATTRACTION' | 'CULTURE' | 'LANDMARK' | 'COMMUNITY'

export interface Picture {
  id?: string
  title: string
  description: string
  author: string
  image?: File
  filename?: string
  category: CategoryType
  createdAt?: Date
}

export function categoryNameOf(category: CategoryType): string {
  const dictionary = {
    ATTRACTION: 'Pontos Turísticos',
    CULTURE: 'Cultura',
    LANDMARK: 'Point da Cidade',
    COMMUNITY: 'Personalidades e Comunidades',
  }
  return dictionary[category]
}

export function categoryColorOf(
  category: CategoryType
): 'warning' | 'primary' | 'secondary' | 'success' | 'error' | 'info' {
  const dictionary = {
    ATTRACTION: 'warning',
    CULTURE: 'secondary',
    LANDMARK: 'success',
    COMMUNITY: 'info',
  }
  return dictionary[category] as
    | 'warning'
    | 'primary'
    | 'secondary'
    | 'success'
    | 'error'
    | 'info'
}
