<script lang="ts" setup>
import type { Ecosystem } from '~/types'

interface EcosystemGridProps {
  limit?: number
}

const { limit = 0 } = defineProps<EcosystemGridProps>()

// Fetch projects. The `queryCollection` API is correct for v3.
// The `default` option is a robust safeguard against errors.
const { data: projects, pending: projectsPending } = await useAsyncData(
  `eco_projects_${limit}`,
  async () => {
    const result = await queryCollection('projects').all()
    return limit > 0 ? result.slice(0, limit) : result
  },
  {
    default: () => []
  }
)

// Fetch categories.
const { data: categories, pending: categoriesPending } = await useAsyncData(
  'eco_categories',
  () => queryCollection('categories').first(),
  {
    default: () => ({ body: [] })
  }
)

function getCategory(id: string): Ecosystem.Category {
  if (!id || !categories.value?.body) {
    return { id: 'default', name: 'Other', icon: '📦' }
  }
  
  const category = categories.value.body.find((c: Ecosystem.Category) => c.id === id)
  return category || { id: 'default', name: 'Other', icon: '📦' }
}

// Simplified computed properties for loading states.
const isLoading = computed(() => projectsPending.value || categoriesPending.value)
const hasProjects = computed(() => projects.value && projects.value.length > 0)
</script>

<template>
  <div class="grid grid-cols-1 w-full gap-4 font-sans lg:grid-cols-3 md:grid-cols-2">
    <template v-if="isLoading">
      <div 
        v-for="i in (limit || 3)" 
        :key="`skeleton-${i}`" 
        class="animate-pulse bg-gray-200 rounded-2xl aspect-ratio-video min-h-200"
      ></div>
    </template>
    
    <template v-else-if="hasProjects">
      <EcosystemCard
        v-for="(p, index) in projects" 
        :key="`${p.name}-${index}`"
        :category="getCategory(p.categories?.[0])"
        :title="p.name"
        :description="p.description"
        :action="{ text: 'Visit Website', href: p.url }"
        :icon="p.icon || undefined"
      />
    </template>
    
    <div v-else class="col-span-full text-center py-8">
      <p>No ecosystem projects found.</p>
    </div>
  </div>
</template>