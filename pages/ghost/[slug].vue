<!-- pages/ghost/[slug].vue - Complete and Fixed -->
<script lang="ts" setup>
import type { GhostPost } from '~/types/ghost'

// Use the Ghost layout
definePageMeta({
  layout: 'ghost'
})

const route = useRoute()
const slug = route.params.slug as string

// Fetch post data
const { data: post, error, pending } = await useLazyAsyncData(`ghost-post-${slug}`, async () => {
  return await $fetch<GhostPost>(`/api/ghost/${slug}`)
}, {
  server: true,
  default: () => null
})

// Handle errors
if (error.value) {
  throw createError({
    statusCode: error.value.statusCode || 404,
    statusMessage: error.value.statusMessage || 'Post not found'
  })
}

// ✅ Load Ghost styles - Critical for proper styling
const { stylesLoaded, stylesError } = useGhostStyles()

// Format date
const publishedDate = computed(() => {
  if (!post.value?.published_at) return ''
  if (process.client) {
    return useAppDateFormat(post.value.published_at)
  } else {
    return new Date(post.value.published_at).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    })
  }
})

// SEO metadata
if (post.value) {
  useSeoMeta({
    title: `${post.value.title} | Storacha Network`,
    description: post.value.excerpt || 'Latest news from Storacha Network',
    ogTitle: post.value.title,
    ogDescription: post.value.excerpt,
    ogImage: post.value.feature_image || '/img/blog-og.jpg',
    ogType: 'article',
    articlePublishedTime: post.value.published_at,
    articleModifiedTime: post.value.updated_at,
    keywords: post.value.tags?.map(tag => tag.name).join(', '),
  })

  useHead({
    script: [{
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
          "url": "https://storacha.network"
        },
        "url": `https://storacha.network/ghost/${post.value.slug}`,
        "mainEntityOfPage": `https://storacha.network/ghost/${post.value.slug}`
      })
    }]
  })
}
</script>

<template>
  <div class="ghost-page">
    <!-- Loading State -->
    <div v-if="pending" class="loading-state">
      <div class="loading-content">
        <div class="loading-spinner">👻</div>
        <h2>Loading Post</h2>
        <p>Fetching content from Ghost CMS...</p>
      </div>
    </div>

    <!-- Error State -->
    <div v-else-if="error || !post" class="error-state">
      <div class="error-content">
        <h2>Post Not Found</h2>
        <p>Sorry, we couldn't find that blog post.</p>
        <a href="/ghost" class="back-link">← Back to Ghost Blog</a>
      </div>
    </div>

    <!-- Post Content -->
    <article v-else class="ghost-article">
      <!-- Breadcrumb -->
      <nav class="breadcrumb">
        <a href="/">Home</a>
        <span>/</span>
        <a href="/ghost">Ghost Blog</a>
        <span>/</span>
        <span>{{ post.title }}</span>
      </nav>

      <!-- Featured Image -->
      <div v-if="post.feature_image" class="feature-image">
        <img 
          :src="post.feature_image" 
          :alt="post.title"
          loading="eager"
        />
      </div>

      <!-- Post Header -->
      <header class="post-header">
        <h1 class="post-title">{{ post.title }}</h1>
        
        <div class="post-meta">
          <div v-if="post.primary_author" class="author">
            <div v-if="post.primary_author.profile_image" class="author-image">
              <img 
                :src="post.primary_author.profile_image" 
                :alt="post.primary_author.name"
              />
            </div>
            <div v-else class="author-avatar">
              <span>{{ post.primary_author.name.charAt(0) }}</span>
            </div>
            <span class="author-name">{{ post.primary_author.name }}</span>
          </div>
          
          <time :datetime="post.published_at" class="publish-date">
            <span class="meta-dot"></span>
            {{ publishedDate }}
          </time>
          
          <span v-if="post.reading_time" class="reading-time">
            <span class="meta-dot"></span>
            {{ post.reading_time }} min read
          </span>
        </div>

        <!-- Tags -->
        <div v-if="post.tags?.length" class="tags">
          <span 
            v-for="tag in post.tags" 
            :key="tag.id"
            class="tag"
          >
            {{ tag.name }}
          </span>
        </div>
      </header>

      <!-- ✅ CRITICAL: Proper Ghost Content Isolation -->
      <div class="ghost-content-isolation">
        <div 
          class="ghost-content"
          v-html="post.html" 
        />
      </div>

      <!-- ✅ CSS Loading Debug Info (remove in production) -->
      <div v-if="stylesError" class="css-debug">
        <p>⚠️ Ghost CSS failed to load, using fallback styles</p>
      </div>
    </article>
    <GhostDebugger />
  </div>
</template>

<style scoped>
.ghost-page {
  max-width: 800px;
  margin: 0 auto;
  padding: 0 2rem;
}

/* Loading State */
.loading-state {
  text-align: center;
  padding: 4rem 0;
}

.loading-spinner {
  font-size: 3rem;
  margin-bottom: 1rem;
  animation: spin 2s linear infinite;
}

.loading-content h2 {
  margin-bottom: 0.5rem;
  color: #15171a;
}

.loading-content p {
  color: #626d79;
}

/* Error State */
.error-state {
  text-align: center;
  padding: 4rem 0;
}

.error-content h2 {
  margin-bottom: 1rem;
  color: #15171a;
}

.error-content p {
  margin-bottom: 2rem;
  color: #626d79;
}

.back-link {
  color: #0084ff;
  text-decoration: none;
  font-weight: 500;
}

.back-link:hover {
  text-decoration: underline;
}

/* Breadcrumb */
.breadcrumb {
  margin-bottom: 2rem;
  font-size: 14px;
  color: #626d79;
}

.breadcrumb a {
  color: #626d79;
  text-decoration: none;
}

.breadcrumb a:hover {
  color: #0084ff;
}

.breadcrumb span {
  margin: 0 0.5rem;
}

/* Featured Image */
.feature-image {
  margin-bottom: 2rem;
  aspect-ratio: 16 / 9;
  overflow: hidden;
  border-radius: 12px;
}

.feature-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

/* Post Header */
.post-header {
  margin-bottom: 3rem;
}

.post-title {
  font-size: 3rem;
  font-weight: 700;
  line-height: 1.2;
  margin-bottom: 1.5rem;
  color: #15171a;
}

.post-meta {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: 1rem;
  margin-bottom: 1.5rem;
  font-size: 14px;
  color: #626d79;
}

.author {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.author-image {
  width: 32px;
  height: 32px;
  border-radius: 50%;
  overflow: hidden;
}

.author-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.author-avatar {
  width: 32px;
  height: 32px;
  border-radius: 50%;
  background: #e5e5e5;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 600;
  color: #15171a;
}

.author-name {
  font-weight: 500;
  color: #15171a;
}

.meta-dot {
  width: 3px;
  height: 3px;
  border-radius: 50%;
  background: #aeb7c1;
  display: inline-block;
}

.publish-date,
.reading-time {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

/* Tags */
.tags {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
}

.tag {
  padding: 0.25rem 0.75rem;
  background: #f8f9fa;
  color: #15171a;
  font-size: 12px;
  font-weight: 500;
  border-radius: 15px;
  border: 1px solid #e5e5e5;
}

/* ✅ CRITICAL: Ghost Content Isolation Wrapper */
.ghost-content-isolation {
  /* Create complete isolation from parent CSS */
  isolation: isolate;
  contain: layout style;
  
  /* Reset everything to browser defaults */
  all: initial;
  
  /* Basic container setup */
  display: block;
  width: 100%;
  
  /* Ensure proper spacing from header */
  margin-top: 2rem;
}

/* CSS Debug Info (remove in production) */
.css-debug {
  margin-top: 2rem;
  padding: 1rem;
  background: #fff3cd;
  border: 1px solid #ffeaa7;
  border-radius: 6px;
  font-size: 14px;
  color: #856404;
}

/* Animations */
@keyframes spin {
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
}

/* Responsive */
@media (max-width: 768px) {
  .ghost-page {
    padding: 0 1rem;
  }
  
  .post-title {
    font-size: 2rem;
  }
  
  .post-meta {
    flex-direction: column;
    align-items: flex-start;
    gap: 0.5rem;
  }
  
  .author {
    width: 100%;
  }
}
</style>