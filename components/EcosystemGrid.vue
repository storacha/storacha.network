<script lang="ts" setup>
import type { Ecosystem, JsonParsedContent, ParsedContent } from '~/types'

const projects = await queryContent<ParsedContent<Ecosystem['project']>>('/ecosystem/projects').sort({ name: 1 }).find()
const categories = await queryContent<JsonParsedContent<Ecosystem['categoryList']>>('/ecosystem/categories').findOne()

// select category from id
function getCategory(id: string) {
  return categories.body?.find(c => c.id === id)
}
</script>

<template>
  <div class="grid grid-cols-1 w-full gap-4 md:grid-cols-3">
    <EcosystemCard
      v-for="p in projects" :key="p.name"
    >
      {{ p.name }}
      <p>{{ p.description }}</p>
      {{ p.url }}
      {{ getCategory(p.categories?.[0]) }}
    </EcosystemCard>
  </div>
</template>

<style>

</style>
