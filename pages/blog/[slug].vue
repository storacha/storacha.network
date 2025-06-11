<script lang="ts" setup>
definePageMeta({
  layout: 'default',
})

const route = useRoute()
const slug = computed(() => route.params.slug as string)

// Fetch the post
const { data: post, error } = await useFetch(`/api/blog/${slug.value}`)

// Handle error or post not found
if (error.value) {
  throw createError({
    statusCode: 404,
    statusMessage: 'Post not found',
    fatal: true,
  })
}

// Set page meta
useSeoMeta({
  title: post.value?.title || 'Blog Post',
  description: post.value?.snippet || '',
  ogImage: post.value?.images?.[0],
  ogType: 'article',
})
</script>

<template>
  <Section v-if="post" class="bg-white" padding>
    <article class="blog-post lg:prose-xl mt-24 max-w-none prose">
      <Heading type="h1">
        {{ post.title }}
      </Heading>

      <div class="mb-8 mt-4 flex items-center gap-4">
        <time class="text-sm text-gray-500" :datetime="post.pubDate">
          {{ useAppDateFormat(post.pubDate) }}
        </time>
      </div>

      <img
        v-if="post.images?.[0]"
        :src="post.images[0]"
        :alt="post.title"
        class="mb-8 max-h-96 w-full rounded-lg object-cover"
      >

      <div class="post-content" v-html="post.content" />
    </article>
  </Section>
</template>

<style>
.post-content img {
  max-width: 100%;
  height: auto;
  border-radius: 0.5rem;
}
</style>
