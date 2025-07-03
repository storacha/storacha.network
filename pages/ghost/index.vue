<!-- pages/ghost/index.vue - COMPLETE FIXED VERSION -->
<script lang="ts" setup>
import type { Feed } from '~/types/blog'
import type { GhostFeed } from '~/types/ghost'
import { transformGhostToFeed } from '~/utils/ghostAdapter'

// Use Ghost layout
definePageMeta({
  layout: 'ghost'
})

// Enhanced SEO metadata
useSeoMeta({
  title: 'Ghost Blog | Latest News from Storacha Network',
  description: 'Stay updated with the latest news, updates, and insights from the Storacha team via Ghost CMS. Discover our latest developments in decentralized storage.',
  ogTitle: 'Storacha Ghost Blog - Latest News & Updates',
  ogDescription: 'Read the latest from Storacha about decentralized storage, web3 innovations, and platform updates.',
  ogImage: '/img/blog-og.jpg',
  ogType: 'website',
  ogUrl: 'https://storacha.network/ghost',
  keywords: 'storacha ghost blog, decentralized storage news, web3, blockchain, filecoin, IPFS, latest updates',
  twitterCard: 'summary_large_image',
  twitterTitle: 'Storacha Ghost Blog - Latest News',
  twitterDescription: 'Stay updated with the latest from Storacha Network',
  twitterImage: '/img/blog-og.jpg',
})

// Structured data for better SEO
useHead({
  script: [{
    type: 'application/ld+json',
    innerHTML: JSON.stringify({
      "@context": "https://schema.org",
      "@type": "Blog",
      "name": "Storacha Ghost Blog",
      "description": "Latest news, updates, and insights from the Storacha team via Ghost CMS.",
      "url": "https://storacha.network/ghost",
      "publisher": {
        "@type": "Organization",
        "name": "Storacha Network",
        "url": "https://storacha.network",
        "logo": {
          "@type": "ImageObject",
          "url": "https://storacha.network/img/storacha-logo.png"
        }
      },
      "breadcrumb": {
        "@type": "BreadcrumbList",
        "itemListElement": [{
          "@type": "ListItem",
          "position": 1,
          "name": "Home",
          "item": "https://storacha.network"
        }, {
          "@type": "ListItem",
          "position": 2,
          "name": "Ghost Blog",
          "item": "https://storacha.network/ghost"
        }]
      }
    })
  }]
})

// Fetch Ghost posts with enhanced error handling
const { data: blog, error, pending, refresh } = await useLazyAsyncData('ghost-blog', async () => {
  try {
    console.log('🔄 Fetching Ghost posts...')
    
    // Fetch from internal API route
    const ghostResponse = await $fetch<GhostFeed>('/api/ghost', {
      timeout: 15000,
      retry: 2
    })
    
    if (!ghostResponse?.posts) {
      throw new Error('No posts returned from Ghost API')
    }
    
    console.log(`✅ Fetched ${ghostResponse.posts.length} Ghost posts`)
    
    // Transform Ghost data to existing blog format
    return transformGhostToFeed(ghostResponse)
  } catch (err: any) {
    console.error('❌ Ghost blog fetch error:', err)
    
    // Provide more specific error information
    if (err.status === 401) {
      throw createError({
        statusCode: 401,
        statusMessage: 'Ghost API authentication failed - check your API key'
      })
    } else if (err.status === 404) {
      throw createError({
        statusCode: 404,
        statusMessage: 'Ghost site not found - check your Ghost URL'
      })
    } else if (err.status >= 500) {
      throw createError({
        statusCode: 503,
        statusMessage: 'Ghost CMS is temporarily unavailable'
      })
    } else {
      throw createError({
        statusCode: 500,
        statusMessage: `Failed to fetch Ghost blog posts: ${err.message}`
      })
    }
  }
}, {
  server: true,
  default: () => ({ items: [] }),
  transform: (data: any) => data || { items: [] }
})

// Fixed refresh and retry functions
const handleRefresh = async () => {
  console.log('🔄 Refreshing Ghost posts...')
  await refresh()
}

const retryFetch = async () => {
  console.log('🔄 Retrying Ghost posts fetch...')
  await refresh()
}

// Computed properties for better UX
const hasError = computed(() => !!error.value)
const hasPosts = computed(() => blog.value?.items?.length > 0)
const postsCount = computed(() => blog.value?.items?.length || 0)

// Error type detection
const errorType = computed(() => {
  if (!error.value) return null
  
  const status = error.value.statusCode || 500
  if (status === 401) return 'auth'
  if (status === 404) return 'notfound'
  if (status >= 500) return 'server'
  return 'unknown'
})

// Load Ghost styles for proper rendering
const { stylesLoaded, stylesError } = useGhostStyles()
</script>

<template>
  <div class="ghost-blog-page">
    <!-- Page Header -->
    <header class="page-header">
      <div class="header-content">
        <h1 class="page-title">
          👻 Ghost Blog
        </h1>
        <p class="page-description">
          Latest content powered by Ghost CMS with real-time updates from our team.
        </p>
        
        <!-- Status Indicators -->
        <div class="status-indicators">
          <div class="status-item" :class="{ 'status-success': stylesLoaded, 'status-warning': stylesError }">
            <span class="status-dot"></span>
            CSS: {{ stylesLoaded ? 'Loaded' : 'Loading...' }}
          </div>
          <div class="status-item" :class="{ 'status-success': !pending && !hasError, 'status-loading': pending, 'status-error': hasError }">
            <span class="status-dot"></span>
            API: {{ pending ? 'Loading...' : hasError ? 'Error' : 'Connected' }}
          </div>
        </div>
      </div>
    </header>

    <!-- Loading State -->
    <div v-if="pending" class="loading-state">
      <div class="loading-content">
        <div class="loading-spinner">
          <div class="spinner-ring"></div>
        </div>
        <h2 class="loading-title">Loading Ghost Posts</h2>
        <p class="loading-text">Fetching latest content from Ghost CMS...</p>
        <div class="loading-dots">
          <span></span>
          <span></span>
          <span></span>
        </div>
      </div>
    </div>

    <!-- Error State -->
    <div v-else-if="hasError" class="error-state">
      <div class="error-content">
        <div class="error-icon">
          <span v-if="errorType === 'auth'">🔐</span>
          <span v-else-if="errorType === 'notfound'">🔍</span>
          <span v-else-if="errorType === 'server'">⚠️</span>
          <span v-else>❌</span>
        </div>
        
        <h2 class="error-title">
          <span v-if="errorType === 'auth'">Authentication Failed</span>
          <span v-else-if="errorType === 'notfound'">Ghost Site Not Found</span>
          <span v-else-if="errorType === 'server'">Ghost CMS Unavailable</span>
          <span v-else>Connection Error</span>
        </h2>
        
        <p class="error-message">
          <span v-if="errorType === 'auth'">
            The Ghost API key appears to be invalid or expired. Please check your configuration.
          </span>
          <span v-else-if="errorType === 'notfound'">
            The Ghost site could not be found. Please verify the Ghost URL is correct.
          </span>
          <span v-else-if="errorType === 'server'">
            Ghost CMS is temporarily unavailable. Please try again later.
          </span>
          <span v-else>
            We're having trouble connecting to Ghost CMS right now.
          </span>
        </p>
        
        <div class="error-details">
          <details class="error-technical">
            <summary>Technical Details</summary>
            <pre class="error-code">{{ error }}</pre>
          </details>
        </div>
        
        <div class="error-actions">
          <button @click="retryFetch" class="retry-button" :disabled="pending">
            🔄 {{ pending ? 'Retrying...' : 'Retry' }}
          </button>
          <NuxtLink to="/blog" class="fallback-link">
            📰 View Medium Blog
          </NuxtLink>
          <NuxtLink to="/" class="home-link">
            🏠 Go Home
          </NuxtLink>
        </div>
      </div>
    </div>

    <!-- Success State - Blog Posts -->
    <div v-else class="content-state">
      <!-- Posts Count and Filters -->
      <div class="content-header">
        <div class="posts-info">
          <span class="posts-count">
            {{ postsCount }} {{ postsCount === 1 ? 'post' : 'posts' }} found
          </span>
          <button @click="handleRefresh" class="refresh-button" :disabled="pending">
            🔄 Refresh
          </button>
        </div>
      </div>

      <!-- Blog Posts Grid -->
      <div v-if="hasPosts" class="blog-grid">
        <BlogCard
          v-for="(item, index) in blog.items"
          :key="`${item.title}-${index}`"
          :item="item"
          class="blog-card-item"
          show-snippet
        />
      </div>
      
      <!-- Empty State -->
      <div v-else class="empty-state">
        <div class="empty-content">
          <div class="empty-icon">📝</div>
          <h3 class="empty-title">No Posts Yet</h3>
          <p class="empty-message">
            No published content found in Ghost CMS. Content will appear here once published.
          </p>
          <div class="empty-actions">
            <button @click="retryFetch" class="retry-button">
              🔄 Check Again
            </button>
            <NuxtLink to="/blog" class="fallback-link">
              📰 View Medium Blog
            </NuxtLink>
          </div>
        </div>
      </div>
    </div>

    <!-- Footer CTA -->
    <section class="footer-cta">
      <div class="cta-content">
        <h3 class="cta-title">Stay Updated</h3>
        <p class="cta-description">
          Follow our Ghost blog for the latest updates on decentralized storage innovations.
        </p>
        <div class="cta-actions">
          <NuxtLink to="/blog" class="cta-button secondary">
            📰 Medium Blog
          </NuxtLink>
          <a href="https://storacha-blog.ghost.io" target="_blank" class="cta-button primary">
            👻 Ghost Site
          </a>
        </div>
      </div>
    </section>
  </div>
</template>

<style scoped>
.ghost-blog-page {
  min-height: 100vh;
  background: #ffffff;
}

/* Page Header */
.page-header {
  background: linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%);
  border-bottom: 1px solid #e5e5e5;
  padding: 3rem 0;
  margin-bottom: 2rem;
}

.header-content {
  max-width: 800px;
  margin: 0 auto;
  text-align: center;
  padding: 0 2rem;
}

.page-title {
  font-size: 3rem;
  font-weight: 700;
  color: #15171a;
  margin-bottom: 1rem;
  letter-spacing: -0.02em;
}

.page-description {
  font-size: 1.25rem;
  color: #626d79;
  margin-bottom: 2rem;
  line-height: 1.6;
  max-width: 600px;
  margin-left: auto;
  margin-right: auto;
}

/* Status Indicators */
.status-indicators {
  display: flex;
  justify-content: center;
  gap: 2rem;
  margin-top: 2rem;
}

.status-item {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem 1rem;
  background: rgba(255, 255, 255, 0.8);
  border-radius: 20px;
  font-size: 14px;
  font-weight: 500;
  border: 1px solid #e5e5e5;
}

.status-dot {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: #adb5bd;
}

.status-success .status-dot { background: #28a745; }
.status-warning .status-dot { background: #ffc107; }
.status-loading .status-dot { 
  background: #007bff; 
  animation: pulse 1.5s infinite;
}
.status-error .status-dot { background: #dc3545; }

@keyframes pulse {
  0%, 100% { opacity: 1; }
  50% { opacity: 0.5; }
}

/* Loading State */
.loading-state {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 400px;
  padding: 4rem 2rem;
}

.loading-content {
  text-align: center;
  max-width: 400px;
}

.loading-spinner {
  margin-bottom: 2rem;
  display: flex;
  justify-content: center;
}

.spinner-ring {
  width: 60px;
  height: 60px;
  border: 4px solid #f8f9fa;
  border-top: 4px solid #0084ff;
  border-radius: 50%;
  animation: spin 1s linear infinite;
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

.loading-title {
  font-size: 1.5rem;
  font-weight: 600;
  color: #15171a;
  margin-bottom: 0.5rem;
}

.loading-text {
  color: #626d79;
  margin-bottom: 1.5rem;
}

.loading-dots {
  display: flex;
  justify-content: center;
  gap: 0.5rem;
}

.loading-dots span {
  width: 8px;
  height: 8px;
  background: #0084ff;
  border-radius: 50%;
  animation: loading-dots 1.4s infinite ease-in-out both;
}

.loading-dots span:nth-child(1) { animation-delay: -0.32s; }
.loading-dots span:nth-child(2) { animation-delay: -0.16s; }

@keyframes loading-dots {
  0%, 80%, 100% { transform: scale(0); }
  40% { transform: scale(1); }
}

/* Error State */
.error-state {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 400px;
  padding: 4rem 2rem;
}

.error-content {
  text-align: center;
  max-width: 500px;
}

.error-icon {
  font-size: 4rem;
  margin-bottom: 1.5rem;
}

.error-title {
  font-size: 1.75rem;
  font-weight: 600;
  color: #15171a;
  margin-bottom: 1rem;
}

.error-message {
  color: #626d79;
  font-size: 1.1rem;
  line-height: 1.6;
  margin-bottom: 2rem;
}

.error-details {
  margin-bottom: 2rem;
}

.error-technical {
  text-align: left;
  background: #f8f9fa;
  border: 1px solid #e5e5e5;
  border-radius: 6px;
  padding: 1rem;
}

.error-technical summary {
  cursor: pointer;
  font-weight: 500;
  color: #626d79;
  margin-bottom: 0.5rem;
}

.error-code {
  background: #1a1a1a;
  color: #e5e5e5;
  padding: 1rem;
  border-radius: 4px;
  font-size: 12px;
  overflow-x: auto;
  margin: 0;
}

.error-actions {
  display: flex;
  justify-content: center;
  gap: 1rem;
  flex-wrap: wrap;
}

.retry-button,
.refresh-button {
  background: #0084ff;
  color: white;
  border: none;
  padding: 0.75rem 1.5rem;
  border-radius: 6px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;
  text-decoration: none;
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
}

.retry-button:hover,
.refresh-button:hover {
  background: #005aa3;
  transform: translateY(-1px);
}

.retry-button:disabled,
.refresh-button:disabled {
  opacity: 0.6;
  cursor: not-allowed;
  transform: none;
}

.fallback-link,
.home-link {
  color: #0084ff;
  text-decoration: none;
  font-weight: 500;
  padding: 0.75rem 1.5rem;
  border: 1px solid #0084ff;
  border-radius: 6px;
  transition: all 0.2s ease;
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
}

.fallback-link:hover,
.home-link:hover {
  background: #0084ff;
  color: white;
  text-decoration: none;
  transform: translateY(-1px);
}

/* Content State */
.content-state {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 2rem 4rem;
}

.content-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
  padding-bottom: 1rem;
  border-bottom: 1px solid #e5e5e5;
}

.posts-info {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.posts-count {
  color: #626d79;
  font-weight: 500;
}

.refresh-button {
  font-size: 14px;
  padding: 0.5rem 1rem;
}

/* Blog Grid */
.blog-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
  gap: 2rem;
  margin-bottom: 4rem;
}

.blog-card-item {
  transition: transform 0.2s ease, box-shadow 0.2s ease;
}

.blog-card-item:hover {
  transform: translateY(-4px);
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.1);
}

/* Empty State */
.empty-state {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 300px;
  padding: 4rem 2rem;
}

.empty-content {
  text-align: center;
  max-width: 400px;
}

.empty-icon {
  font-size: 4rem;
  margin-bottom: 1.5rem;
}

.empty-title {
  font-size: 1.5rem;
  font-weight: 600;
  color: #15171a;
  margin-bottom: 1rem;
}

.empty-message {
  color: #626d79;
  line-height: 1.6;
  margin-bottom: 2rem;
}

.empty-actions {
  display: flex;
  justify-content: center;
  gap: 1rem;
  flex-wrap: wrap;
}

/* Footer CTA */
.footer-cta {
  background: linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%);
  padding: 4rem 2rem;
  margin-top: 4rem;
}

.cta-content {
  max-width: 600px;
  margin: 0 auto;
  text-align: center;
}

.cta-title {
  font-size: 2rem;
  font-weight: 600;
  color: #15171a;
  margin-bottom: 1rem;
}

.cta-description {
  color: #626d79;
  font-size: 1.1rem;
  line-height: 1.6;
  margin-bottom: 2rem;
}

.cta-actions {
  display: flex;
  justify-content: center;
  gap: 1rem;
  flex-wrap: wrap;
}

.cta-button {
  padding: 0.75rem 2rem;
  border-radius: 6px;
  font-weight: 500;
  text-decoration: none;
  transition: all 0.2s ease;
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
}

.cta-button.primary {
  background: #0084ff;
  color: white;
  border: 2px solid #0084ff;
}

.cta-button.primary:hover {
  background: #005aa3;
  border-color: #005aa3;
  transform: translateY(-2px);
}

.cta-button.secondary {
  background: transparent;
  color: #0084ff;
  border: 2px solid #0084ff;
}

.cta-button.secondary:hover {
  background: #0084ff;
  color: white;
  transform: translateY(-2px);
}

/* Responsive Design */
@media (max-width: 768px) {
  .page-title {
    font-size: 2.5rem;
  }
  
  .page-description {
    font-size: 1.1rem;
  }
  
  .status-indicators {
    flex-direction: column;
    gap: 1rem;
    align-items: center;
  }
  
  .blog-grid {
    grid-template-columns: 1fr;
    gap: 1.5rem;
  }
  
  .content-header {
    flex-direction: column;
    gap: 1rem;
    align-items: stretch;
    text-align: center;
  }
  
  .error-actions,
  .empty-actions,
  .cta-actions {
    flex-direction: column;
    align-items: center;
  }
  
  .header-content,
  .content-state {
    padding-left: 1rem;
    padding-right: 1rem;
  }
}

@media (max-width: 480px) {
  .page-title {
    font-size: 2rem;
  }
  
  .cta-title {
    font-size: 1.5rem;
  }
  
  .error-title,
  .empty-title {
    font-size: 1.25rem;
  }
}
</style>