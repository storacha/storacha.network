<!-- eslint-disable no-console -->
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
  if (!post.value?.content)
    return ''
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
    { rel: 'stylesheet', href: '/ghost-cards.css' },
  ],
  script: [{
    type: 'application/ld+json',
    innerHTML: JSON.stringify({
      '@context': 'https://schema.org',
      '@type': 'BlogPosting',
      'headline': post.value?.title,
      'image': post.value?.images?.[0],
      'datePublished': post.value?.pubDate,
      'author': { '@type': 'Organization', 'name': 'Storacha Network' },
      'publisher': {
        '@type': 'Organization',
        'name': 'Storacha Network',
        'logo': { '@type': 'ImageObject', 'url': 'https://storacha.network/img/logo.png' },
      },
    }),
  }],
})

onMounted(() => {
  console.log('Content loaded, looking for video cards...')
  const videoCards = document.querySelectorAll('.kg-video-card')
  console.log(`Found ${videoCards.length} video cards`)
  // Toggle cards
  document.querySelectorAll('.kg-toggle-heading').forEach((heading) => {
    heading.addEventListener('click', () => {
      const card = heading.closest('.kg-toggle-card')
      if (card) {
        card.classList.toggle('kg-toggle-card-open')
      }
    })
  })

  // Audio - just ensure controls are enabled
  document.querySelectorAll('.kg-audio-card audio').forEach((audio) => {
    const el = audio as HTMLAudioElement
    el.controls = true
    el.preload = 'metadata'
  })

  // Videos - remove custom controller, enable native controls
  document.querySelectorAll('.kg-video-card').forEach((card, index) => {
    const video = card.querySelector('video') as HTMLVideoElement | null
    const overlay = card.querySelector('.kg-video-overlay') as HTMLElement | null
    const vscController = card.querySelector('vsc-controller') as HTMLElement | null

    console.log(`Video card ${index}:`, {
      hasVideo: !!video,
      hasOverlay: !!overlay,
      hasVscController: !!vscController,
    })

    // Remove the custom video controller
    if (vscController) {
      vscController.remove()
    }

    if (video) {
      video.controls = true
      // Ensure video is playable
      video.style.pointerEvents = 'auto'
    }

    if (overlay) {
      overlay.remove() // Completely remove overlay instead of hiding
    }
  })
})
</script>

<template>
  <Section v-if="post" class="bg-white" padding>
    <article class="blog-post mx-auto mt-24 max-w-4xl px-4">
      <header class="mb-12">
        <Heading type="h1" class="mb-4 text-4xl font-bold lg:text-6xl md:text-5xl">
          {{ post.title }}
        </Heading>

        <time class="mb-8 block text-base text-gray-500" :datetime="post.pubDate">
          {{ useAppDateFormat(post.pubDate) }}
        </time>

        <img
          v-if="post.images?.[0]"
          :src="post.images[0]"
          :alt="post.title"
          class="max-h-[500px] w-full rounded-lg object-cover shadow-lg"
        >
      </header>

      <div class="gh-content" v-html="processedContent" />

      <footer class="mt-16 border-t border-gray-200 pt-8">
        <NuxtLink
          to="/blog"
          class="inline-flex items-center text-blue-600 font-medium hover:text-blue-800"
        >
          <svg class="mr-2 h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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
.blog-post :deep(.kg-video-container) {
  height: auto !important;
  position: relative;
  width: 100%;
}

.blog-post :deep(.kg-video-container video) {
  position: relative !important;
  width: 100%;
  height: auto !important;
  display: block;
}

.blog-post :deep(.kg-video-overlay) {
  display: none !important;
  pointer-events: none !important; /* Allow clicks to pass through */
}
</style>
