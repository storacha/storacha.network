<script lang="ts" setup>
import type { Ecosystem } from '~/types'

interface EcosystemGridProps {
  limit?: number
}

const { limit = 0 } = defineProps<EcosystemGridProps>()

// SSR-first approach with hydration safety
const { data: projects, pending: projectsPending } = await useAsyncData(
  `eco_projects_${limit}`,
  async () => {
    const result = await queryCollection('projects').all()
    return limit > 0 ? result.slice(0, limit) : result
  },
  {
    // Keep server-side rendering for SEO
    server: true,
    // Use transform to ensure consistent data structure
    transform: (data) => {
      // Ensure we always return an array with consistent structure
      if (!data || !Array.isArray(data)) return []
      return data.map(item => ({
        ...item,
        // Ensure all properties exist to prevent hydration mismatches
        name: item.name || '',
        description: item.description || '',
        url: item.url || '',
        categories: item.categories || [],
        icon: item.icon || undefined
      }))
    },
    default: () => []
  }
)

const { data: categories, pending: categoriesPending } = await useAsyncData(
  'eco_categories',
  async () => await queryCollection('categories').first(),
  {
    server: true,
    transform: (data) => {
      // Ensure consistent structure
      if (!data || !data.body) {
        return { body: [] }
      }
      return {
        ...data,
        body: data.body.map(cat => ({
          ...cat,
          id: cat.id || '',
          name: cat.name || '',
          icon: cat.icon || '📦'
        }))
      }
    },
    default: () => ({ body: [] })
  }
)

// select category from id with fallback to default category
function getCategory(id: string): Ecosystem.Category {
  if (!id || !categories.value?.body) {
    return { id: 'default', name: 'Other', icon: '📦' }
  }
  
  const category = categories.value.body.find((c: Ecosystem.Category) => c.id === id)
  return category || { id: 'default', name: 'Other', icon: '📦' }
}

// Hydration-safe computed properties
const isLoading = computed(() => projectsPending.value || categoriesPending.value)
const hasProjects = computed(() => projects.value && Array.isArray(projects.value) && projects.value.length > 0)

// Client-side hydration check
const isHydrated = ref(false)
onMounted(() => {
  isHydrated.value = true
})
</script>

<template>
  <div class="grid grid-cols-1 w-full gap-4 font-sans lg:grid-cols-3 md:grid-cols-2">
    <!-- Always show content structure for SEO, but handle loading states -->
    <template v-if="hasProjects">
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
    
    <!-- Loading state - only show after hydration to prevent mismatch -->
    <template v-else-if="isLoading && isHydrated">
      <div 
        v-for="i in (limit || 3)" 
        :key="`skeleton-${i}`" 
        class="animate-pulse bg-gray-200 rounded-2xl aspect-ratio-video min-h-200"
      ></div>
    </template>
    
    <!-- Empty state - only after hydration -->
    <div v-else-if="!isLoading && isHydrated" class="col-span-full text-center py-8">
      <p>No ecosystem projects found.</p>
    </div>
  </div>
</template>