<script lang="ts" setup>
import type { GhostPost } from '~/types/ghost'

const route = useRoute()
const slug = route.params.slug as string

const { data: post, error, pending } = await useLazyFetch<GhostPost>(`/api/ghost-post/${slug}`, {
  server: false
})

// SEO metadata
useSeoMeta({
  title: () => post.value ? `${post.value.title} | Storacha Network` : 'Loading...',
  description: () => post.value?.excerpt || 'Latest news from Storacha Network',
  ogTitle: () => post.value?.title,
  ogDescription: () => post.value?.excerpt,
  ogImage: () => post.value?.feature_image || '/img/blog-og.jpg',
  ogType: 'article',
  articlePublishedTime: () => post.value?.published_at,
  articleModifiedTime: () => post.value?.updated_at,
  keywords: () => post.value?.tags?.map(tag => tag.name).join(', '),
})

// Structured data
useHead(() => ({
  script: post.value ? [{
    type: 'application/ld+json',
    innerHTML: JSON.stringify({
      "@context": "https://schema.org",
      "@type": "BlogPosting",
      "headline": post.value.title,
      "description": post.value.excerpt,
      "image": post.value.feature_image,
      "datePublished": post.value.published_at,
      "dateModified": post.value.updated_at,
      "author": {
        "@type": "Person",
        "name": post.value.primary_author?.name || "Storacha Team"
      },
      "publisher": {
        "@type": "Organization",
        "name": "Storacha Network",
        "url": "https://storacha.network",
        "logo": {
          "@type": "ImageObject",
          "url": "https://storacha.network/img/logo.png"
        }
      },
      "url": `https://storacha.network/ghost/${post.value.slug}`,
      "mainEntityOfPage": `https://storacha.network/ghost/${post.value.slug}`
    })
  }] : []
}))

const publishedDate = computed(() => {
  if (!post.value?.published_at) return ''
  return useAppDateFormat(post.value.published_at)
})

// Load Ghost assets
useHead({
  link: [
    {
      rel: 'stylesheet',
      href: 'https://storacha-blog.ghost.io/public/cards.min.css',
      media: 'all'
    }
  ],
  script: [
    {
      src: 'https://storacha-blog.ghost.io/public/cards.min.js',
      defer: true
    }
  ]
})
</script>

<template>
  <div>
    <!-- Loading State -->
    <Section v-if="pending" class="bg-white" padding>
      <div class="grid-margins text-center section-py">
        <div class="text-6xl mb-4 animate-spin">👻</div>
        <Heading type="h2" class="mb-4">Loading Post</Heading>
        <p class="p1 text-brand-3">Fetching your content...</p>
      </div>
    </Section>

    <!-- Error State -->
    <Section v-else-if="error || !post" class="bg-white" padding>
      <div class="grid-margins text-center section-py">
        <img 
          src="/img/errors/error-confused-racha.svg" 
          alt="Confused Racha" 
          class="w-32 h-32 mx-auto mb-6"
        />
        <Heading type="h2" class="mb-4 text-brand-3">Post Not Found</Heading>
        <p class="p1 mb-8 text-brand-3">Sorry, we couldn't find that blog post.</p>
        <Btn href="/ghost" class="flex items-center gap-2">
          <span>←</span>
          <span>Back to Ghost Blog</span>
        </Btn>
      </div>
    </Section>

    <!-- Post Content -->
    <article v-else>
      <!-- Header Section - Your UnoCSS styling -->
      <Section class="bg-white" padding>
        <div class="grid-margins">
          <div class="mt-20 mb-10">
            <!-- Breadcrumb -->
            <nav class="mb-8">
              <div class="flex items-center gap-2 p4 text-brand-3">
                <AppLink href="/" class="hover:underline hover:text-brand-1 transition-colors">Home</AppLink>
                <span>/</span>
                <AppLink href="/ghost" class="hover:underline hover:text-brand-1 transition-colors">Ghost Blog</AppLink>
                <span>/</span>
                <span class="font-medium">{{ post.title }}</span>
              </div>
            </nav>

            <!-- Featured Image -->
            <div v-if="post.feature_image" class="mb-10 aspect-video overflow-hidden rounded-2xl shadow-lg">
              <img 
                :src="post.feature_image" 
                :alt="post.title"
                class="w-full h-full object-cover"
              />
            </div>

            <!-- Post Header -->
            <header class="mb-10 max-w-4xl">
              <Heading type="h1" class="mb-6 text-balance">
                {{ post.title }}
              </Heading>
              
              <div class="flex flex-wrap items-center gap-6 mb-6 p3 text-brand-3">
                <div v-if="post.primary_author" class="flex items-center gap-3">
                  <div v-if="post.primary_author.profile_image" class="w-10 h-10 rounded-full overflow-hidden bg-brand-2">
                    <img 
                      :src="post.primary_author.profile_image" 
                      :alt="post.primary_author.name"
                      class="w-full h-full object-cover"
                    />
                  </div>
                  <div v-else class="w-10 h-10 rounded-full bg-brand-2 flex items-center justify-center">
                    <span class="font-heading font-medium text-brand-1">{{ post.primary_author.name.charAt(0) }}</span>
                  </div>
                  <span class="font-medium">{{ post.primary_author.name }}</span>
                </div>
                
                <time :datetime="post.published_at" class="flex items-center gap-2">
                  <span class="w-1 h-1 rounded-full bg-brand-3"></span>
                  {{ publishedDate }}
                </time>
                
                <span v-if="post.reading_time" class="flex items-center gap-2">
                  <span class="w-1 h-1 rounded-full bg-brand-3"></span>
                  {{ post.reading_time }} min read
                </span>
              </div>

              <!-- Tags -->
              <div v-if="post.tags?.length" class="flex flex-wrap gap-3">
                <span 
                  v-for="tag in post.tags" 
                  :key="tag.id"
                  class="px-4 py-2 bg-brand-2 text-brand-1 p4 font-medium rounded-full"
                >
                  {{ tag.name }}
                </span>
              </div>
            </header>
          </div>
        </div>
      </Section>

      <!-- 🔥 ISOLATED GHOST CONTENT SECTION - No UnoCSS interference -->
      <section class="ghost-blog-content">
        <div class="ghost-content-wrapper">
          <!-- Excerpt with your styling -->
          <div v-if="post.excerpt" class="excerpt-section">
            <p>{{ post.excerpt }}</p>
          </div>

          <!-- Pure Ghost Content - Full width, no UnoCSS -->
          <div class="ghost-raw-content" v-html="post.html" />
        </div>
      </section>

      <!-- Footer Section - Your UnoCSS styling -->
      <Section class="bg-white" padding>
        <div class="grid-margins">
          <div class="mt-12 pt-8 border-t border-brand-2">
            <Btn href="/ghost" outline>
              <span class="flex items-center gap-2">
                <span class="text-lg">←</span>
                Back to Ghost Blog
              </span>
            </Btn>
          </div>
        </div>
      </Section>
    </article>
  </div>
</template>

<style scoped>
/* 🔥 ISOLATED GHOST SECTION - Bypass UnoCSS completely */
.ghost-blog-content {
  /* Reset everything to avoid UnoCSS conflicts */
  all: initial;
  
  /* Container styling */
  background: white;
  padding: 0;
  margin: 0;
  width: 100%;
  
  /* Allow full-width content like real Ghost */
  max-width: none;
  overflow-x: hidden;
}

.ghost-content-wrapper {
  /* Center content but allow breakouts */
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 2rem;
  
  /* Reset everything for Ghost content */
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
  line-height: 1.6;
  color: #15171a;
}

.excerpt-section {
  max-width: 740px;
  margin: 2rem auto;
  padding: 1.5rem;
  background: #f9f9f9;
  border-radius: 8px;
  border-left: 4px solid #0176CE;
}

.excerpt-section p {
  margin: 0;
  font-style: italic;
  color: #666;
  font-size: 1.125rem;
  line-height: 1.6;
}

.ghost-raw-content {
  /* This is where Ghost CSS takes over completely */
  /* No UnoCSS interference here */
  max-width: none;
  margin: 0;
  padding: 0;
}

/* Allow Ghost's width classes to work properly */
.ghost-raw-content :deep(.kg-width-wide) {
  position: relative;
  width: 85vw;
  min-width: 100%;
  margin: 2rem auto calc(50% - 50vw);
  transform: translateX(calc(50vw - 50%));
}

.ghost-raw-content :deep(.kg-width-full) {
  position: relative;
  width: 100vw;
  left: 50%;
  right: 50%;
  margin-left: -50vw;
  margin-right: -50vw;
}

/* Mobile responsiveness */
@media (max-width: 768px) {
  .ghost-content-wrapper {
    padding: 0 1rem;
  }
  
  .ghost-raw-content :deep(.kg-width-wide),
  .ghost-raw-content :deep(.kg-width-full) {
    width: 100% !important;
    margin-left: 0 !important;
    margin-right: 0 !important;
    transform: none !important;
    left: auto !important;
    right: auto !important;
  }
}
</style>