<script lang="ts" setup>
const { data: blog } = await useLazyFetch('/api/blog')
const medium = useSocialNetwork('medium')
</script>

<template>
  <TransitionProvider>
    <Section class="bg-brand-4">
      <Hero
        class="min-h-150"
        eyebrow="Blazing Hot News"
        title="Storacha Blog"
        description="The latest and greatest from the Storacha team."
        :actions="[
          { text: 'Follow on Medium', href: medium?.url },
        ]"
      />
    </Section>
    <Section class="bg-white" padding>
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
  </TransitionProvider>
</template>
