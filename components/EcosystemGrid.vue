<script lang="ts" setup>
import type { Ecosystem, ParsedContent } from '~/types'

interface EcosystemGridProps {
  limit?: number
}

interface ParsedEcosystemCategories extends ParsedContent<{
  body: Ecosystem.CategoryList
}> {}

const props = withDefaults(defineProps<EcosystemGridProps>(), {
  limit: 0,
})

// fetch projects and categories
const { data: projects } = await useAsyncData(
  `eco_projects_${props.limit}`,
  () => queryContent<ParsedContent<Ecosystem.Project>>('/ecosystem/projects').limit(props.limit).find(),
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
    />
  </div>
</template>
