<script lang="ts" setup>
import type { Feed } from '~/types/blog'

const { data: blog } = await useLazyFetch<Feed>('/api/blog', { 
  server: false,
  default: () => ({ items: [] })
})

const items = computed(() => blog.value?.items?.slice(0, 2) ?? [])
</script>

<template>
  <div class="h-full flex items-center justify-center">
    <div>
      <div class="blog-cell grid gap-4 sm:cols-2">
        <BlogCard
          v-for="item in items"
          :key="item.title"
          :item="item"
          class="grid-rows-subgrid"
        />
      </div>
      <div class="mt-10 flex items-center justify-center p1">
        <AppLink href="/blog" primary class="flex items-center gap-1 lh-none">
          View Storacha Blog<AppIcon i="i-carbon:arrow-right" />
        </AppLink>
      </div>
    </div>
  </div>
</template>

<style lang="postcss" scoped>
/* featured item style */

/*
@screen sm {
  .blog-cell >:first-child {
    @apply col-span-2;
  }
}
*/
</style>