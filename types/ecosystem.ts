export interface Category {
  id: string
  name: string
  icon: string
}

export interface Project {
  name: string
  description: string
  url: string
  categories: Category['id'][]
  icon?: string
}

export type ProjectList = Project[]
export type CategoryList = Category[]
