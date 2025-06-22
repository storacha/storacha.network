<script lang="ts" setup>
import type { Ecosystem } from '~/types'

interface EcosystemGridProps {
  limit?: number
}

interface CategoriesContent {
  body: Ecosystem.Category[]
}

const { limit = 0 } = defineProps<EcosystemGridProps>()

// Nuxt Content v3 - using separate collections for projects and categories
const { data: projects } = await useAsyncData(
  `eco_projects_${limit}`,
  async () => {
    const result = await queryCollection('projects').all()
    return limit > 0 ? result.slice(0, limit) : result
  },
)

const { data: categories } = await useAsyncData(
  'eco_categories',
  async () => await queryCollection('categories').first(),
)

// select category from id with fallback to default category
function getCategory(id: string): Ecosystem.Category {
  if (!id || !categories.value?.body) {
    console.log('No category ID or categories data, using default:', { id, categories: categories.value })
    return { id: 'default', name: 'Other', icon: '📦' }
  }
  
  // In v3, your YAML structure still has a .body property
  const category = categories.value.body.find((c: Ecosystem.Category) => c.id === id)
  
  if (category) {
    console.log('Found category for', id, ':', category)
    return category
  } else {
    console.log('Category not found for', id, 'using default')
    return { id: 'default', name: 'Other', icon: '📦' }
  }
}
</script>

<template>
  <div class="grid grid-cols-1 w-full gap-4 font-sans lg:grid-cols-3 md:grid-cols-2">
    <template v-if="projects && projects.length > 0">
      <EcosystemCard
        v-for="p in projects" 
        :key="p.name"
        :category="getCategory(p.categories?.[0])"
        :title="p.name"
        :description="p.description"
        :action="{ text: 'Visit Website', href: p.url }"
        :icon="p.icon"
      />
    </template>
    <div v-else class="col-span-full text-center py-8">
      <p>No ecosystem projects found.</p>
    </div>
  </div>
</template>