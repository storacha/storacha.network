<script lang="ts" setup>
const { data: blog } = await useLazyFetch('/api/blog')
const medium = useSocialNetwork('medium')
</script>

<template>
  <Section class="bg-white" padding>
    <div class="py-4 flex md:flex-row flex-col mt-20">
      <div class="flex-none mb-4 md:mb-0">
        <Heading type="h4" class="uppercase color-brand-3">
          Blazing Hot News
        </Heading>
        <p class="max-w-50ch text-pretty prose p1 color-brand-3">The latest and greatest from the Storacha team.</p>
      </div>
      <div class="flex-auto md:text-right">
        <Btn text="Follow on Medium" :href="medium?.href" />
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
