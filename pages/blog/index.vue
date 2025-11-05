<script lang="ts" setup>
const { data: blog } = await useFetch('/api/blog')

useSeoMeta({
  title: 'Blog | Latest News from Storacha Network',
  description: 'Stay updated with the latest news, updates, and insights from the Storacha team.',
  ogImage: '/img/blog-og.jpg',
})

useHead({
  script: [{
    type: 'application/ld+json',
    innerHTML: JSON.stringify({
      "@context": "https://schema.org",
      "@type": "Blog",
      "name": "Storacha Blog",
      "url": "https://storacha.network/blog",
      "publisher": {
        "@type": "Organization",
        "name": "Storacha Network",
        "logo": { "@type": "ImageObject", "url": "https://storacha.network/img/logo.png" }
      }
    })
  }]
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

    <div v-if="blog?.items?.length" class="blog-cell grid gap-4 lg:cols-3 md:cols-2">
      <BlogCard
        v-for="item in blog.items"
        :key="item.title"
        :item="item"
        class="grid-rows-subgrid"
        show-snippet
      />
    </div>

    <div v-else class="col-span-full text-center py-12">
      <Heading type="h3" class="mb-4">No Posts Yet</Heading>
      <p class="color-brand-3">Check back soon for new content.</p>
    </div>
  </Section>
</template>