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
  currentUser?: {
    visited: boolean
  }
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
    ATTRACTION: 'info',
    CULTURE: 'error',
    LANDMARK: 'success',
    COMMUNITY: 'primary',
  }
  return dictionary[category] as
    | 'warning'
    | 'primary'
    | 'secondary'
    | 'success'
    | 'error'
    | 'info'
}
