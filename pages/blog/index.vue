<script lang="ts" setup>
const { data: blog } = await useFetch('/api/blog')

// Set page metadata
useSeoMeta({
  title: 'Blog - Storacha Network',
  description: 'The latest and greatest from the Storacha team.',
})
</script>

<template>
  <Section class="bg-white" padding>
    <div class="mt-20 flex flex-col py-4 md:flex-row">
      <div class="mb-4 flex-none md:mb-0">
        <Heading type="h4" class="color-brand-3 uppercase">
          Blazing Hot News
        </Heading>
        <p class="max-w-50ch text-pretty color-brand-3 prose p1">
          The latest and greatest from the Storacha team.
        </p>
      </div>
    </div>
    <div class="blog-cell grid gap-4 lg:cols-3 md:cols-2">
      <BlogCard
        v-for="item in blog?.items"
        :key="item.title"
        :item="item"
        class="grid-rows-subgrid"
        show-snippet
      />
    </div>
  </Section>
</template>
