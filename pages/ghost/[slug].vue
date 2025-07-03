<!-- pages/ghost/[slug].vue - COMPLETE FIXED VERSION -->
<script lang="ts" setup>
import type { GhostPost } from '~/types/ghost'

// Use the Ghost layout
definePageMeta({
  layout: 'ghost'
})

const route = useRoute()
const slug = route.params.slug as string

// Validate slug before making API call
if (!slug || typeof slug !== 'string') {
  throw createError({
    statusCode: 400,
    statusMessage: 'Invalid post slug'
  })
}

// Fetch post data with proper error handling
const { data: post, error, pending } = await useLazyAsyncData(`ghost-post-${slug}`, async () => {
  try {
    return await $fetch<GhostPost>(`/api/ghost/${slug}`)
  } catch (err: any) {
    console.error('Failed to fetch Ghost post:', err)
    throw err
  }
}, {
  server: true,
  default: () => null
})

// Handle errors appropriately
if (error.value) {
  throw createError({
    statusCode: error.value.statusCode || 404,
    statusMessage: error.value.statusMessage || 'Post not found'
  })
}

// Load Ghost styles - CRITICAL for proper styling
const { stylesLoaded, stylesError, loadGhostStyles } = useGhostStyles()

// Ensure styles are loaded when component mounts
onMounted(async () => {
  if (!stylesLoaded.value) {
    console.log('🎨 Manually loading Ghost styles on post page')
    await loadGhostStyles()
  }
})

// Format date consistently
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

// Share functionality
const handleSharePost = () => {
  if (!post.value) return
  
  if (process.client && navigator.share) {
    navigator.share({
      title: post.value.title,
      text: post.value.excerpt || 'Check out this post from Storacha',
      url: window.location.href
    }).catch(console.error)
  } else if (process.client) {
    // Fallback to copying URL
    navigator.clipboard.writeText(window.location.href).then(() => {
      alert('Post URL copied to clipboard!')
    }).catch(() => {
      // Final fallback
      prompt('Copy this URL:', window.location.href)
    })
  }
}

// Enhanced SEO metadata
if (post.value) {
  const postUrl = `https://storacha.network/ghost/${post.value.slug}`
  
  useSeoMeta({
    title: `${post.value.title} | Storacha Network`,
    description: post.value.excerpt || 'Latest news from Storacha Network',
    ogTitle: post.value.title,
    ogDescription: post.value.excerpt,
    ogImage: post.value.feature_image || '/img/blog-og.jpg',
    ogType: 'article',
    ogUrl: postUrl,
    articlePublishedTime: post.value.published_at,
    articleModifiedTime: post.value.updated_at,
    keywords: post.value.tags?.map(tag => tag.name).join(', '),
    twitterCard: 'summary_large_image',
    twitterTitle: post.value.title,
    twitterDescription: post.value.excerpt,
    twitterImage: post.value.feature_image || '/img/blog-og.jpg',
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
            "url": "https://storacha.network/img/storacha-logo.png"
          }
        },
        "url": postUrl,
        "mainEntityOfPage": postUrl
      })
    }]
  })
}

// Add reading progress indicator
const readingProgress = ref(0)

if (process.client) {
  onMounted(() => {
    const updateProgress = () => {
      const article = document.querySelector('.ghost-article')
      if (!article) return
      
      const scrollTop = window.scrollY
      const docHeight = document.documentElement.scrollHeight - window.innerHeight
      const progress = (scrollTop / docHeight) * 100
      readingProgress.value = Math.min(100, Math.max(0, progress))
    }
    
    window.addEventListener('scroll', updateProgress)
    onUnmounted(() => window.removeEventListener('scroll', updateProgress))
  })
}
</script>

<template>
  <div class="ghost-page">
    <!-- Reading Progress Bar -->
    <div 
      class="reading-progress-bar" 
      :style="{ width: `${readingProgress}%` }"
    />

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
        <div class="error-actions">
          <NuxtLink to="/ghost" class="back-link">← Back to Ghost Blog</NuxtLink>
          <NuxtLink to="/" class="home-link">Go Home</NuxtLink>
        </div>
      </div>
    </div>

    <!-- Post Content -->
    <article v-else class="ghost-article">
      <!-- Breadcrumb Navigation -->
      <nav class="breadcrumb" aria-label="Breadcrumb">
        <ol class="breadcrumb-list">
          <li><NuxtLink to="/">Home</NuxtLink></li>
          <li><NuxtLink to="/ghost">Ghost Blog</NuxtLink></li>
          <li aria-current="page">{{ post.title }}</li>
        </ol>
      </nav>

      <!-- Featured Image -->
      <div v-if="post.feature_image" class="feature-image">
        <img 
          :src="post.feature_image" 
          :alt="post.title"
          loading="eager"
          class="feature-image-img"
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
              <span>{{ post.primary_author.name.charAt(0).toUpperCase() }}</span>
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
            #{{ tag.name }}
          </span>
        </div>
      </header>

      <!-- CRITICAL: Proper Ghost Content Isolation -->
      <div class="ghost-content-root">
        <div class="ghost-content-isolation">
          <div 
            class="ghost-content"
            v-html="post.html" 
          />
        </div>
      </div>

      <!-- CSS Loading Status (dev only) -->
      <div v-if="$dev && stylesError" class="css-debug">
        ⚠️ Ghost CSS failed to load, using fallback styles
      </div>

      <!-- Post Footer -->
      <footer class="post-footer">
        <div class="post-actions">
          <NuxtLink to="/ghost" class="back-to-blog">
            ← Back to Ghost Blog
          </NuxtLink>
          
          <div class="share-buttons">
            <button 
              @click="handleSharePost"
              class="share-button"
              aria-label="Share this post"
            >
              Share Post
            </button>
          </div>
        </div>
        
        <!-- Author Bio -->
        <div v-if="post.primary_author" class="author-bio">
          <div class="author-bio-avatar">
            <img 
              v-if="post.primary_author.profile_image"
              :src="post.primary_author.profile_image" 
              :alt="post.primary_author.name"
            />
            <div v-else class="author-avatar-large">
              {{ post.primary_author.name.charAt(0).toUpperCase() }}
            </div>
          </div>
          <div class="author-bio-content">
            <h3 class="author-bio-name">{{ post.primary_author.name }}</h3>
            <p v-if="post.primary_author.bio" class="author-bio-text">
              {{ post.primary_author.bio }}
            </p>
          </div>
        </div>
      </footer>
    </article>
  </div>
</template>

<style scoped>
.ghost-page {
  max-width: 800px;
  margin: 0 auto;
  padding: 0 2rem;
  min-height: 100vh;
}

/* Reading Progress Bar */
.reading-progress-bar {
  position: fixed;
  top: 0;
  left: 0;
  height: 3px;
  background: #0084ff;
  z-index: 100;
  transition: width 0.1s ease;
}

/* Loading State */
.loading-state {
  text-align: center;
  padding: 4rem 0;
  min-height: 60vh;
  display: flex;
  align-items: center;
  justify-content: center;
}

.loading-spinner {
  font-size: 4rem;
  margin-bottom: 1rem;
  animation: float 2s ease-in-out infinite;
}

@keyframes float {
  0%, 100% { transform: translateY(0px); }
  50% { transform: translateY(-10px); }
}

.loading-content h2 {
  margin-bottom: 0.5rem;
  color: #15171a;
  font-size: 1.5rem;
}

.loading-content p {
  color: #626d79;
  font-size: 1rem;
}

/* Error State */
.error-state {
  text-align: center;
  padding: 4rem 0;
  min-height: 60vh;
  display: flex;
  align-items: center;
  justify-content: center;
}

.error-content h2 {
  margin-bottom: 1rem;
  color: #15171a;
  font-size: 2rem;
}

.error-content p {
  margin-bottom: 2rem;
  color: #626d79;
  font-size: 1.1rem;
}

.error-actions {
  display: flex;
  gap: 1rem;
  justify-content: center;
  flex-wrap: wrap;
}

.back-link,
.home-link {
  color: #0084ff;
  text-decoration: none;
  font-weight: 500;
  padding: 0.5rem 1rem;
  border: 1px solid #0084ff;
  border-radius: 6px;
  transition: all 0.2s ease;
}

.back-link:hover,
.home-link:hover {
  background: #0084ff;
  color: white;
  text-decoration: none;
}

/* Breadcrumb */
.breadcrumb {
  margin-bottom: 2rem;
  font-size: 14px;
}

.breadcrumb-list {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  list-style: none;
  margin: 0;
  padding: 0;
  color: #626d79;
}

.breadcrumb-list li {
  display: flex;
  align-items: center;
}

.breadcrumb-list li:not(:last-child)::after {
  content: '/';
  margin-left: 0.5rem;
  color: #aeb7c1;
}

.breadcrumb-list a {
  color: #626d79;
  text-decoration: none;
  transition: color 0.2s ease;
}

.breadcrumb-list a:hover {
  color: #0084ff;
}

.breadcrumb-list li[aria-current="page"] {
  color: #15171a;
  font-weight: 500;
}

/* Featured Image */
.feature-image {
  margin-bottom: 2rem;
  aspect-ratio: 16 / 9;
  overflow: hidden;
  border-radius: 12px;
  background: #f8f9fa;
}

.feature-image-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.3s ease;
}

.feature-image:hover .feature-image-img {
  transform: scale(1.02);
}

/* Post Header */
.post-header {
  margin-bottom: 3rem;
  padding-bottom: 2rem;
  border-bottom: 1px solid #e5e5e5;
}

.post-title {
  font-size: 3rem;
  font-weight: 700;
  line-height: 1.2;
  margin-bottom: 1.5rem;
  color: #15171a;
  letter-spacing: -0.02em;
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

.author-image,
.author-avatar {
  width: 32px;
  height: 32px;
  border-radius: 50%;
  overflow: hidden;
  flex-shrink: 0;
}

.author-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.author-avatar {
  background: #e5e5e5;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 600;
  color: #15171a;
  font-size: 14px;
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
  margin: 0 0.5rem;
}

.publish-date,
.reading-time {
  display: flex;
  align-items: center;
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
  color: #0084ff;
  font-size: 12px;
  font-weight: 500;
  border-radius: 15px;
  border: 1px solid #e5e5e5;
  transition: all 0.2s ease;
}

.tag:hover {
  background: #0084ff;
  color: white;
  border-color: #0084ff;
}

/* CRITICAL: Ghost Content Isolation */
.ghost-content-root {
  margin: 3rem 0;
  min-height: 200px;
}

.ghost-content-isolation {
  /* Create complete isolation from parent CSS */
  isolation: isolate;
  contain: layout style;
  /* Reset everything to browser defaults */
  all: initial;
  /* Basic container setup */
  display: block;
  width: 100%;
  /* Ensure proper spacing */
  margin: 2rem 0;
  /* Add subtle background to show content area */
  background: rgba(248, 249, 250, 0.3);
  border-radius: 8px;
  padding: 2rem;
  border: 1px solid rgba(229, 239, 245, 0.5);
}

/* CSS Debug Info */
.css-debug {
  margin: 2rem 0;
  padding: 1rem;
  background: #fff3cd;
  border: 1px solid #ffeaa7;
  border-radius: 6px;
  font-size: 14px;
  color: #856404;
  text-align: center;
}

/* Post Footer */
.post-footer {
  margin-top: 4rem;
  padding-top: 2rem;
  border-top: 1px solid #e5e5e5;
}

.post-actions {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 3rem;
  flex-wrap: wrap;
  gap: 1rem;
}

.back-to-blog {
  color: #0084ff;
  text-decoration: none;
  font-weight: 500;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  transition: color 0.2s ease;
}

.back-to-blog:hover {
  color: #005aa3;
  text-decoration: none;
}

.share-button {
  background: #0084ff;
  color: white;
  border: none;
  padding: 0.5rem 1rem;
  border-radius: 6px;
  cursor: pointer;
  font-weight: 500;
  transition: background 0.2s ease;
}

.share-button:hover {
  background: #005aa3;
}

/* Author Bio */
.author-bio {
  display: flex;
  gap: 1rem;
  padding: 2rem;
  background: #f8f9fa;
  border-radius: 12px;
  border: 1px solid #e5e5e5;
}

.author-bio-avatar {
  flex-shrink: 0;
}

.author-bio-avatar img,
.author-avatar-large {
  width: 64px;
  height: 64px;
  border-radius: 50%;
  object-fit: cover;
}

.author-avatar-large {
  background: #e5e5e5;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 600;
  color: #15171a;
  font-size: 24px;
}

.author-bio-content {
  flex: 1;
}

.author-bio-name {
  margin: 0 0 0.5rem 0;
  font-size: 1.25rem;
  font-weight: 600;
  color: #15171a;
}

.author-bio-text {
  margin: 0;
  color: #626d79;
  line-height: 1.6;
}

/* Responsive Design */
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
  
  .ghost-content-isolation {
    padding: 1rem;
    margin: 1rem 0;
  }
  
  .post-actions {
    flex-direction: column;
    align-items: stretch;
    text-align: center;
  }
  
  .author-bio {
    flex-direction: column;
    text-align: center;
  }
  
  .breadcrumb-list {
    flex-wrap: wrap;
  }
}

@media (max-width: 480px) {
  .post-title {
    font-size: 1.75rem;
  }
  
  .error-actions {
    flex-direction: column;
    align-items: center;
  }
}
</style>