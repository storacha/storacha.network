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

const processedContent = computed(() => {
  if (!post.value?.content) return ''
  let html = post.value.content
  
  // Fix internal Ghost URLs
  html = html.replace(/href="https:\/\/storacha-network\.ghost\.io\//g, 'href="/blog/')
  
  return html
})

useSeoMeta({
  title: `${post.value?.title} | Storacha Blog`,
  description: post.value?.snippet,
  ogImage: post.value?.images?.[0] || '/img/blog-og.jpg',
  ogType: 'article',
})

useHead({
  link: [
    { rel: 'stylesheet', href: '/ghost-screen.css' },
    { rel: 'stylesheet', href: '/ghost-cards.css' }
  ],
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

// Minimal JavaScript for interactive cards
onMounted(() => {
  // Toggle cards
  document.querySelectorAll('.kg-toggle-heading').forEach((heading) => {
    heading.addEventListener('click', () => {
      const card = heading.closest('.kg-toggle-card')
      if (card) {
        card.classList.toggle('kg-toggle-card-open')
      }
    })
  })

  // Video cards
  document.querySelectorAll('.kg-video-overlay').forEach((overlay) => {
    overlay.addEventListener('click', () => {
      const container = overlay.closest('.kg-video-container')
      const video = container?.querySelector('video') as HTMLVideoElement
      
      if (video) {
        (overlay as HTMLElement).style.display = 'none'
        video.play()
      }
    })
  })

  // Audio - just ensure controls are enabled
  document.querySelectorAll('.kg-audio-card audio').forEach((audio) => {
    const el = audio as HTMLAudioElement
    el.controls = true
    el.preload = 'metadata'
  })
})
</script>

<template>
  <Section v-if="post" class="bg-white" padding>
    <article class="blog-post max-w-4xl mx-auto mt-24 px-4">
      <header class="mb-12">
        <Heading type="h1" class="text-4xl md:text-5xl lg:text-6xl font-bold mb-4">
          {{ post.title }}
        </Heading>

        <time class="block text-base text-gray-500 mb-8" :datetime="post.pubDate">
          {{ useAppDateFormat(post.pubDate) }}
        </time>

        <img 
          v-if="post.images?.[0]" 
          :src="post.images[0]" 
          :alt="post.title"
          class="w-full max-h-[500px] object-cover rounded-lg shadow-lg"
        >
      </header>

      <div class="gh-content" v-html="processedContent" />

      <footer class="mt-16 pt-8 border-t border-gray-200">
        <NuxtLink 
          to="/blog" 
          class="inline-flex items-center text-blue-600 hover:text-blue-800 font-medium"
        >
          <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
          </svg>
          Back to Blog
        </NuxtLink>
      </footer>
    </article>
  </Section>
</template>

<style scoped>
.blog-post :deep(img) {
  max-width: 100%;
  height: auto;
}
</style>