<script lang="ts" setup>
interface EcosystemGridProps {
  limit?: number
}

const { limit = 0 } = defineProps<EcosystemGridProps>()

// Use the ecosystem composable for consistent data access
const { getCategory, getProjects } = useEcosystem()

// Get projects with optional limit
const projects = computed(() => getProjects(limit))
const hasProjects = computed(() => projects.value && projects.value.length > 0)
</script>

<template>
  <div class="grid grid-cols-1 w-full gap-4 font-sans lg:grid-cols-3 md:grid-cols-2">
    <!-- Projects loaded successfully -->
    <template v-if="hasProjects">
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

    <!-- No projects found -->
    <div v-else class="col-span-full text-center py-8">
      <p>No ecosystem projects found.</p>
    </div>
  </div>
</template>