<script lang="ts" setup>
const { data: blog } = await useLazyFetch('/api/blog')
</script>

<template>
  <div class="blog-cell grid gap-4 sm:cols-2">
    <BlogCard
      v-for="item in blog?.items"
      :key="item.title"
      :item="item"
      class="grid-rows-subgrid"
    />
  </div>
</template>

<style lang="postcss" scoped>
@screen sm {
  .blog-cell >:first-child {
    @apply col-span-2;
  }
}
</style>
