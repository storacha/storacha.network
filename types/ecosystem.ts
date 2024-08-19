interface Category {
  id: string
  name: string
  icon: string
}

interface Project {
  name: string
  description: string
  url: string
  categories: Category['id'][]
}

export interface Ecosystem {
  project: Project
  projectList: Project[]
  category: Category
  categoryList: Category[]
}
