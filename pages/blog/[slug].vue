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
  
  // Fix Ghost URLs
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

onMounted(() => {
  console.log('=== Ghost Cards Initialization ===')
  
  // 1. TOGGLE CARDS
  const toggleCards = document.querySelectorAll('.kg-toggle-card')
  console.log(`Found ${toggleCards.length} toggle cards`)
  
  toggleCards.forEach((card, index) => {
    const heading = card.querySelector('.kg-toggle-heading')
    const content = card.querySelector('.kg-toggle-content') as HTMLElement
    
    if (heading && content) {
      console.log(`Toggle ${index}:`, {
        hasHeading: true,
        hasContent: true,
        contentInnerHTML: content.innerHTML.substring(0, 50) + '...',
        isOpen: card.classList.contains('kg-toggle-card-open')
      })
      
      // Clone to remove old listeners
      const newHeading = heading.cloneNode(true) as HTMLElement
      heading.parentNode?.replaceChild(newHeading, heading)
      
      newHeading.addEventListener('click', () => {
        const wasOpen = card.classList.contains('kg-toggle-card-open')
        card.classList.toggle('kg-toggle-card-open')
        console.log(`Toggle ${index} clicked:`, wasOpen ? 'closing' : 'opening')
      })
    } else {
      console.warn(`Toggle ${index} missing elements:`, { hasHeading: !!heading, hasContent: !!content })
    }
  })
  
  // 2. VIDEO CARDS
  const videoCards = document.querySelectorAll('.kg-video-card')
  console.log(`Found ${videoCards.length} video cards`)
  
  videoCards.forEach((card, index) => {
    const video = card.querySelector('video') as HTMLVideoElement | null
    const overlay = card.querySelector('.kg-video-overlay') as HTMLElement | null
    
    if (video && overlay) {
      console.log(`Video ${index}:`, {
        src: video.src || video.querySelector('source')?.src || 'NO SOURCE',
        hasOverlay: true,
        videoVisible: window.getComputedStyle(video).display !== 'none',
        overlayVisible: window.getComputedStyle(overlay).display !== 'none'
      })
      
      overlay.addEventListener('click', () => {
        console.log(`Video ${index} play clicked`)
        overlay.classList.add('hidden')
        video.play()
          .then(() => console.log(`Video ${index} playing`))
          .catch(err => console.error(`Video ${index} play failed:`, err))
      })
      
      video.addEventListener('play', () => {
        console.log(`Video ${index} started`)
        overlay.classList.add('hidden')
      })
      
      video.addEventListener('pause', () => {
        if (!video.ended) {
          console.log(`Video ${index} paused`)
          overlay.classList.remove('hidden')
        }
      })
      
      video.addEventListener('ended', () => {
        console.log(`Video ${index} ended`)
        overlay.classList.remove('hidden')
      })
    } else {
      console.warn(`Video ${index} missing elements:`, { hasVideo: !!video, hasOverlay: !!overlay })
    }
  })
  
  // 3. AUDIO CARDS
  const audioCards = document.querySelectorAll('.kg-audio-card')
  console.log(`Found ${audioCards.length} audio cards`)
  
  audioCards.forEach((card, index) => {
    const audioElements = card.querySelectorAll('audio')
    console.log(`Audio card ${index} has ${audioElements.length} audio elements`)
    
    audioElements.forEach((audio, audioIndex) => {
      const el = audio as HTMLAudioElement
      el.controls = true
      el.preload = 'metadata'
      
      console.log(`Audio ${index}-${audioIndex}:`, {
        src: el.src || el.querySelector('source')?.src || 'NO SOURCE',
        visible: window.getComputedStyle(el).display !== 'none'
      })
    })
  })
  
  console.log('=== Initialization Complete ===')
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