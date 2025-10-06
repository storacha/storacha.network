<script lang="ts" setup>
const route = useRoute()
const slug = computed(() => route.params.slug as string)

const { data: post, error } = await useFetch(`/api/blog/${slug.value}`)

if (error.value) {
  throw createError({
    statusCode: 404,
    statusMessage: 'Post not found',
    fatal: true,
  })
}

useSeoMeta({
  title: `${post.value?.title} | Storacha Blog`,
  description: post.value?.snippet,
  ogImage: post.value?.images?.[0] || '/img/blog-og.jpg',
  ogType: 'article',
})

useHead({
  script: [{
    type: 'application/ld+json',
    innerHTML: JSON.stringify({
      "@context": "https://schema.org",
      "@type": "BlogPosting",
      "headline": post.value?.title,
      "image": post.value?.images?.[0],
      "datePublished": post.value?.pubDate,
      "author": { "@type": "Organization", "name": "Storacha Network" },
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
  <Section v-if="post" class="bg-white" padding>
    <article class="blog-post lg:prose-xl mt-24 max-w-none prose">
      <Heading type="h1">{{ post.title }}</Heading>
      
      <time class="mb-8 mt-4 block text-sm text-gray-500" :datetime="post.pubDate">
        {{ useAppDateFormat(post.pubDate) }}
      </time>

      <img
        v-if="post.images?.[0]"
        :src="post.images[0]"
        :alt="post.title"
        class="mb-8 max-h-96 w-full rounded-lg object-cover"
      >

      <div class="post-content" v-html="post.content" />

      <NuxtLink to="/blog" class="mt-12 inline-flex border-t border-gray-200 pt-8">
        ← Back to Blog
      </NuxtLink>
    </article>
  </Section>
</template>

<style scoped>
.post-content :deep(img) {
  max-width: 100%;
  height: auto;
  border-radius: 0.5rem;
}
</style>