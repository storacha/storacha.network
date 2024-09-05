<script lang="ts" setup>
import type { Ecosystem, ParsedContent } from '~/types'

interface EcosystemGridProps {
  limit?: number
}

interface ParsedEcosystemCategories extends ParsedContent<{
  body: Ecosystem.CategoryList
}> {}

const { limit = 0 } = defineProps<EcosystemGridProps>()

// fetch projects and categories
const { data: projects } = await useAsyncData(
  `eco_projects_${limit}`,
  () => queryContent<ParsedContent<Ecosystem.Project>>('/ecosystem/projects').limit(limit).find(),
)

const { data: categories } = await useAsyncData(
  'eco_categories',
  () => queryContent<ParsedEcosystemCategories>('/ecosystem/categories').findOne(),
)

// select category from id
function getCategory(id: string) {
  return categories.value?.body?.find(c => c.id === id) as Ecosystem.Category
}
</script>

<template>
  <div class="grid grid-cols-1 w-full gap-4 font-sans lg:grid-cols-3 md:grid-cols-2">
    <EcosystemCard
      v-for="p in projects" :key="p.name"
      :category="getCategory(p.categories?.[0])"
      :title="p.name"
      :description="p.description"
      :action="{ text: 'Visit Website', href: p.url }"
      :icon="p.icon"
    />
  </div>
</template>
