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

// Process Ghost content
const processedContent = computed(() => {
  if (!post.value?.content) return ''
  let html = post.value.content
  
  // Fix internal Ghost URLs
  html = html.replace(
    /href="https:\/\/storacha-network\.ghost\.io\//g,
    'href="/blog/'
  )
  
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
    {
      rel: 'stylesheet',
      href: '/ghost-cards.css'
    }
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

// Initialize interactive elements
onMounted(() => {
  // Toggle cards
  document.querySelectorAll('.kg-toggle-card').forEach((card) => {
    const heading = card.querySelector('.kg-toggle-heading')
    const content = card.querySelector('.kg-toggle-content') as HTMLElement | null
    
    if (heading && content) {
      // Remove any existing listeners
      const newHeading = heading.cloneNode(true)
      heading.parentNode?.replaceChild(newHeading, heading)
      
      newHeading.addEventListener('click', () => {
        const isOpen = card.classList.contains('kg-toggle-card-open')
        
        if (isOpen) {
          card.classList.remove('kg-toggle-card-open')
          content.style.maxHeight = '0'
        } else {
          card.classList.add('kg-toggle-card-open')
          content.style.maxHeight = content.scrollHeight + 'px'
        }
      })
    }
  })

  // Video cards with play overlay
  document.querySelectorAll('.kg-video-card').forEach((card) => {
    const video = card.querySelector('video') as HTMLVideoElement | null
    const overlay = card.querySelector('.kg-video-overlay') as HTMLElement | null
    const playBtn = card.querySelector('.kg-video-large-play-icon') as HTMLElement | null

    if (video && overlay && playBtn) {
      playBtn.addEventListener('click', (e) => {
        e.preventDefault()
        overlay.style.display = 'none'
        video.play().catch(err => console.error('Video play error:', err))
      })

      video.addEventListener('ended', () => {
        overlay.style.display = 'flex'
      })
      
      video.addEventListener('play', () => {
        overlay.style.display = 'none'
      })
      
      video.addEventListener('pause', () => {
        if (!video.ended) {
          overlay.style.display = 'flex'
        }
      })
    }
  })

  // Audio controls
  document.querySelectorAll('.kg-audio-card audio').forEach((el) => {
    const audio = el as HTMLAudioElement
    audio.controls = true
    audio.preload = 'metadata'
  })
})
</script>

<template>
  <Section v-if="post" class="bg-white" padding>
    <article class="blog-post max-w-4xl mx-auto mt-24 px-4">
      <!-- Post Header -->
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

      <!-- Ghost Content Container -->
      <div class="ghost-content-wrapper">
        <div class="gh-content" v-html="processedContent" />
      </div>

      <!-- Back Link -->
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
/* Scope Ghost styles to content area only */
.ghost-content-wrapper {
  max-width: 100%;
}

.ghost-content-wrapper :deep(.gh-content) {
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", "Roboto", "Oxygen", "Ubuntu", sans-serif;
  font-size: 1.8rem;
  line-height: 1.6;
  color: #15171A;
}

.ghost-content-wrapper :deep(.gh-content > * + *) {
  margin-top: 2.8rem;
  margin-bottom: 0;
}

.ghost-content-wrapper :deep(.gh-content h2) {
  font-size: 3.6rem;
  font-weight: 700;
  margin: 1.5em 0 0.5em;
  color: #15171A;
  line-height: 1.15;
}

.ghost-content-wrapper :deep(.gh-content h3) {
  font-size: 2.8rem;
  font-weight: 600;
  margin: 1.5em 0 0.5em;
}

.ghost-content-wrapper :deep(.gh-content p) {
  margin: 0 0 1.5em;
  font-size: 1.9rem;
  line-height: 1.6;
}

.ghost-content-wrapper :deep(.gh-content a) {
  color: #0066CC;
  text-decoration: none;
}

.ghost-content-wrapper :deep(.gh-content a:hover) {
  text-decoration: underline;
}

/* Ensure images are responsive */
.ghost-content-wrapper :deep(img) {
  max-width: 100%;
  height: auto;
  border-radius: 0.5rem;
  margin: 2em 0;
}

/* Video fixes */
.ghost-content-wrapper :deep(.kg-video-card) {
  margin: 3em 0;
  width: 100%;
}

.ghost-content-wrapper :deep(.kg-video-container) {
  position: relative;
  width: 100%;
  background: #000;
  border-radius: 5px;
  overflow: hidden;
}

.ghost-content-wrapper :deep(.kg-video-container video) {
  width: 100%;
  height: auto;
  display: block;
}

.ghost-content-wrapper :deep(.kg-video-overlay) {
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  background: linear-gradient(180deg, rgba(0, 0, 0, 0.3) 0%, transparent);
  cursor: pointer;
}

.ghost-content-wrapper :deep(.kg-video-large-play-icon) {
  width: 80px;
  height: 80px;
  background: rgba(255, 255, 255, 0.9);
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  transition: all 0.2s ease;
}

.ghost-content-wrapper :deep(.kg-video-large-play-icon:hover) {
  background: white;
  transform: scale(1.1);
}

.ghost-content-wrapper :deep(.kg-video-large-play-icon svg) {
  width: 32px;
  height: 32px;
  fill: #15171A;
  margin-left: 4px;
}

/* Audio player styling */
.ghost-content-wrapper :deep(.kg-audio-card) {
  margin: 3em 0;
  width: 100%;
}

.ghost-content-wrapper :deep(.kg-audio-card audio) {
  width: 100%;
  outline: none;
}

/* Toggle cards */
.ghost-content-wrapper :deep(.kg-toggle-card) {
  margin: 2em 0;
  border: 1px solid #E6EBF0;
  border-radius: 5px;
  overflow: hidden;
}

.ghost-content-wrapper :deep(.kg-toggle-heading) {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1.5em;
  cursor: pointer;
  user-select: none;
  background: #F4F8FB;
  transition: background 0.2s ease;
}

.ghost-content-wrapper :deep(.kg-toggle-heading:hover) {
  background: #E6EBF0;
}

.ghost-content-wrapper :deep(.kg-toggle-heading-text) {
  font-size: 1.8rem;
  font-weight: 600;
  color: #15171A;
}

.ghost-content-wrapper :deep(.kg-toggle-card-icon) {
  width: 24px;
  height: 24px;
  transition: transform 0.3s ease;
}

.ghost-content-wrapper :deep(.kg-toggle-card-open .kg-toggle-card-icon) {
  transform: rotate(180deg);
}

.ghost-content-wrapper :deep(.kg-toggle-content) {
  max-height: 0;
  overflow: hidden;
  transition: max-height 0.3s ease-in-out;
}

.ghost-content-wrapper :deep(.kg-toggle-card-open .kg-toggle-content) {
  padding: 1.5em;
  border-top: 1px solid #E6EBF0;
}

/* Bookmark cards */
.ghost-content-wrapper :deep(.kg-bookmark-card) {
  margin: 3em 0;
}

.ghost-content-wrapper :deep(.kg-bookmark-container) {
  display: flex;
  text-decoration: none;
  border-radius: 5px;
  border: 1px solid #E6EBF0;
  overflow: hidden;
  color: inherit;
}

.ghost-content-wrapper :deep(.kg-bookmark-container:hover) {
  border-color: #0066CC;
}

.ghost-content-wrapper :deep(.kg-bookmark-content) {
  flex: 1;
  padding: 1.5em;
}

.ghost-content-wrapper :deep(.kg-bookmark-title) {
  font-size: 1.8rem;
  font-weight: 600;
  color: #15171A;
  line-height: 1.4;
}

.ghost-content-wrapper :deep(.kg-bookmark-description) {
  margin-top: 0.5em;
  font-size: 1.6rem;
  color: #626D79;
  line-height: 1.5;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.ghost-content-wrapper :deep(.kg-bookmark-metadata) {
  display: flex;
  align-items: center;
  margin-top: 1em;
  color: #626D79;
  font-size: 1.4rem;
}

.ghost-content-wrapper :deep(.kg-bookmark-thumbnail) {
  position: relative;
  min-width: 33%;
}

.ghost-content-wrapper :deep(.kg-bookmark-thumbnail img) {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  margin: 0;
}

/* File cards */
.ghost-content-wrapper :deep(.kg-file-card) {
  margin: 3em 0;
}

.ghost-content-wrapper :deep(.kg-file-card-container) {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1.5em;
  border: 1px solid #E6EBF0;
  border-radius: 5px;
}

@media (max-width: 768px) {
  .ghost-content-wrapper :deep(.gh-content) {
    font-size: 1.7rem;
  }
  
  .ghost-content-wrapper :deep(.gh-content h2) {
    font-size: 2.8rem;
  }
  
  .ghost-content-wrapper :deep(.gh-content h3) {
    font-size: 2.4rem;
  }
}
</style>