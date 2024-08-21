<script lang="ts" setup>
import type { Ecosystem, ParsedContent } from '~/types'

interface ParsedEcosystemCategories extends ParsedContent<{
  body: Ecosystem.CategoryList
}> {}

const { data: projects } = await useAsyncData(
  'eco_projects',
  () => queryContent<ParsedContent<Ecosystem.Project>>('/ecosystem/projects').sort({ name: 1 }).find(),
)
const { data: categories } = await useAsyncData(
  'eco_categories',
  () => queryContent<ParsedEcosystemCategories>('/ecosystem/categories').findOne(),
)

// select category from id
function getCategory(id: string) {
  return categories.value?.body?.find(c => c.id === id)
}
</script>

<template>
  <div class="grid grid-cols-1 w-full gap-4 md:grid-cols-3">
    <EcosystemCard
      v-for="p in projects" :key="p.name"
      :category="getCategory(p.categories?.[0])"
      :title="p.name"
      :description="p.description"
      :action="{ text: 'Visit Website ->', href: p.url }"
    />
  </div>
</template>
