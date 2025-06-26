<!-- pages/ghost/[slug].vue -->
<script lang="ts" setup>
import type { GhostPost } from '~/types/ghost'

// Use the Ghost layout
definePageMeta({
  layout: 'ghost'
})

const route = useRoute()
const slug = route.params.slug as string

// Fetch the post data
const { data: post, error, pending } = await useLazyAsyncData(`ghost-post-${slug}`, async () => {
  return await $fetch<GhostPost>(`/api/ghost/${slug}`)
}, {
  server: true,
  default: () => null
})

// Handle error state
if (error.value) {
  throw createError({
    statusCode: error.value.statusCode || 404,
    statusMessage: error.value.statusMessage || 'Post not found'
  })
}

// Load Ghost CSS dynamically on the client
const { stylesLoaded, stylesError, loadGhostStyles } = await useGhostStyles()

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
          "url": "https://storacha.network",
          "logo": {
            "@type": "ImageObject",
            "url": "https://storacha.network/img/logo.png"
          }
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
    <div v-if="pending" class="ghost-loading">
      <div class="ghost-loading-content">
        <div class="ghost-loading-spinner">👻</div>
        <h2>Loading Post</h2>
        <p>Fetching your content...</p>
        <div v-if="!stylesLoaded && !stylesError" class="ghost-styles-status">
          Loading Ghost styles...
        </div>
      </div>
    </div>

    <!-- Error State -->
    <div v-else-if="error || !post" class="ghost-error">
      <div class="ghost-error-content">
        <h2>Post Not Found</h2>
        <p>Sorry, we couldn't find that blog post.</p>
        <a href="/ghost">← Back to Ghost Blog</a>
      </div>
    </div>

    <!-- Post Content -->
    <article v-else class="ghost-article">
      <div class="ghost-container">
        <!-- Breadcrumb -->
        <nav class="ghost-breadcrumb">
          <a href="/">Home</a>
          <span>/</span>
          <a href="/ghost">Ghost Blog</a>
          <span>/</span>
          <span>{{ post.title }}</span>
        </nav>

        <!-- Featured Image -->
        <div v-if="post.feature_image" class="ghost-feature-image">
          <img 
            :src="post.feature_image" 
            :alt="post.title"
          />
        </div>

        <!-- Post Header -->
        <header class="ghost-post-header">
          <h1 class="ghost-post-title">{{ post.title }}</h1>
          
          <div class="ghost-post-meta">
            <div v-if="post.primary_author" class="ghost-author">
              <div v-if="post.primary_author.profile_image" class="ghost-author-image">
                <img 
                  :src="post.primary_author.profile_image" 
                  :alt="post.primary_author.name"
                />
              </div>
              <div v-else class="ghost-author-avatar">
                <span>{{ post.primary_author.name.charAt(0) }}</span>
              </div>
              <span class="ghost-author-name">{{ post.primary_author.name }}</span>
            </div>
            
            <time :datetime="post.published_at">
              <span class="ghost-meta-dot"></span>
              {{ publishedDate }}
            </time>
            
            <span v-if="post.reading_time">
              <span class="ghost-meta-dot"></span>
              {{ post.reading_time }} min read
            </span>
          </div>

          <!-- Tags -->
          <div v-if="post.tags?.length" class="ghost-tags">
            <span 
              v-for="tag in post.tags" 
              :key="tag.id"
              class="ghost-tag"
            >
              {{ tag.name }}
            </span>
          </div>
        </header>

        <!-- Excerpt -->
        <div v-if="post.excerpt" class="ghost-excerpt">
          <p>{{ post.excerpt }}</p>
        </div>
        
        <!-- 
          Ghost Content with Dynamic CSS
          The layout provides ghost-content-isolation, and we add ghost-content class
          CSS is loaded dynamically from Ghost or falls back to our styles
        -->
        <div 
          class="ghost-content"
          :class="{
            'styles-loaded': stylesLoaded,
            'styles-fallback': stylesError
          }"
          v-html="post.html" 
        />
      </div>
    </article>
  </div>
</template>

<style>
/* Base Ghost content styles - enhanced by dynamic CSS when available */
.ghost-content {
  font-family: Georgia, Times, "Times New Roman", serif;
  font-size: 20px;
  line-height: 1.6em;
  color: #15171A;
  font-weight: 400;
  max-width: none;
  transition: opacity 0.3s ease;
}

.ghost-content.styles-loaded {
  opacity: 1;
}

.ghost-content.styles-fallback {
  opacity: 0.95;
}

/* Basic Ghost typography fallbacks */
.ghost-content h1,
.ghost-content h2,
.ghost-content h3,
.ghost-content h4,
.ghost-content h5,
.ghost-content h6 {
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
  font-weight: 700;
  line-height: 1.25em;
  margin: 2em 0 0.5em 0;
  color: #15171A;
}

.ghost-content h1 { font-size: 3.2rem; }
.ghost-content h2 { font-size: 2.6rem; }
.ghost-content h3 { font-size: 2.0rem; }

.ghost-content p {
  margin: 0 0 1.5em 0;
  line-height: 1.6em;
}

.ghost-content a {
  color: #0084FF;
  text-decoration: underline;
}

/* Basic Ghost cards */
.ghost-content .kg-image {
  width: 100%;
  height: auto;
  margin: 2em 0;
  border-radius: 6px;
}

.ghost-content .kg-gallery-container {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 0.5em;
  margin: 2em 0;
}

.ghost-content .kg-bookmark-card {
  border: 1px solid #e5e5e5;
  border-radius: 6px;
  padding: 1em;
  margin: 2em 0;
  text-decoration: none;
  display: block;
}
</style>

<style scoped>
.ghost-page {
  max-width: 800px;
  margin: 0 auto;
  padding: 0 2rem;
}

.ghost-container {
  width: 100%;
}

/* Loading State */
.ghost-loading {
  text-align: center;
  padding: 4rem 0;
}

.ghost-loading-spinner {
  font-size: 3rem;
  margin-bottom: 1rem;
  animation: spin 2s linear infinite;
}

.ghost-styles-status {
  margin-top: 1rem;
  font-size: 0.875rem;
  color: #626d79;
}

/* Error State */
.ghost-error {
  text-align: center;
  padding: 4rem 0;
}

.ghost-error a {
  color: #0084ff;
  text-decoration: none;
}

/* Breadcrumb */
.ghost-breadcrumb {
  margin-bottom: 2rem;
  font-size: 14px;
  color: #626d79;
}

.ghost-breadcrumb a {
  color: #626d79;
  text-decoration: none;
}

.ghost-breadcrumb a:hover {
  color: #0084ff;
}

.ghost-breadcrumb span {
  margin: 0 0.5rem;
}

/* Featured Image */
.ghost-feature-image {
  margin-bottom: 2rem;
  aspect-ratio: 16 / 9;
  overflow: hidden;
  border-radius: 12px;
}

.ghost-feature-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

/* Post Header */
.ghost-post-header {
  margin-bottom: 2rem;
}

.ghost-post-title {
  font-size: 3rem;
  font-weight: 700;
  line-height: 1.2;
  margin-bottom: 1rem;
  color: #15171A;
}

.ghost-post-meta {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: 1rem;
  margin-bottom: 1rem;
  font-size: 14px;
  color: #626d79;
}

.ghost-author {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.ghost-author-image {
  width: 32px;
  height: 32px;
  border-radius: 50%;
  overflow: hidden;
}

.ghost-author-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.ghost-author-avatar {
  width: 32px;
  height: 32px;
  border-radius: 50%;
  background: #e5e5e5;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 600;
  color: #15171A;
}

.ghost-author-name {
  font-weight: 500;
  color: #15171A;
}

.ghost-meta-dot {
  width: 3px;
  height: 3px;
  border-radius: 50%;
  background: #aeb7c1;
}

/* Tags */
.ghost-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
}

.ghost-tag {
  padding: 0.25rem 0.75rem;
  background: #f8f9fa;
  color: #15171A;
  font-size: 12px;
  font-weight: 500;
  border-radius: 15px;
  border: 1px solid #e5e5e5;
}

/* Excerpt */
.ghost-excerpt {
  margin-bottom: 2rem;
  padding: 1.5rem;
  background: #f8f9fa;
  border-left: 4px solid #0084ff;
  border-radius: 0 6px 6px 0;
  font-style: italic;
  color: #626d79;
}

.ghost-excerpt p {
  margin: 0;
}

/* Debug info */
.ghost-debug {
  margin-top: 2rem;
  padding: 1rem;
  background: #f8f9fa;
  border: 1px solid #e5e5e5;
  border-radius: 6px;
  font-size: 12px;
  color: #626d79;
}

@keyframes spin {
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
}

@media (max-width: 768px) {
  .ghost-page {
    padding: 0 1rem;
  }
  
  .ghost-post-title {
    font-size: 2rem;
  }
}
</style>