import type { Ecosystem } from '~/types'
import { projects, categories } from '~/data/ecosystem'

export function useEcosystem() {
  function getCategory(id: string): Ecosystem.Category {
    if (!id || !categories) {
      return { id: 'default', name: 'Other', icon: '📦' }
    }
    
    const category = categories.find((c: Ecosystem.Category) => c.id === id)
    return category || { id: 'default', name: 'Other', icon: '📦' }
  }

  function getProjects(limit?: number): Ecosystem.Project[] {
    return limit && limit > 0 ? projects.slice(0, limit) : projects
  }

  return {
    projects: readonly(ref(projects)),
    categories: readonly(ref(categories)),
    getCategory,
    getProjects
  }
}