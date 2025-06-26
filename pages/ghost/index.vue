<!-- pages/ghost/index.vue -->
<script lang="ts" setup>
import type { Feed } from '~/types/blog'
import type { GhostFeed } from '~/types/ghost'
import { transformGhostToFeed } from '~/utils/ghostAdapter'

// SEO metadata for the Ghost blog page
useSeoMeta({
  title: 'Ghost Blog | Latest News from Storacha Network',
  description: 'Stay updated with the latest news, updates, and insights from the Storacha team via Ghost CMS.',
  ogTitle: 'Storacha Ghost Blog - Latest News & Updates',
  ogDescription: 'Read the latest from Storacha about decentralized storage, web3 innovations, and platform updates.',
  ogImage: '/img/blog-og.jpg',
  keywords: 'storacha ghost blog, decentralized storage news, web3, blockchain, filecoin, IPFS',
})

// Structured data for the blog
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
        "url": "https://storacha.network"
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

// Client-side data fetching
const blog = ref<Feed>({ items: [] })
const error = ref<any>(null)
const pending = ref(true)

// Only run on client-side
onMounted(async () => {
  try {
    // Fetch from Ghost API
    const ghostResponse = await $fetch<GhostFeed>('/api/ghost-blog')
    // Transform Ghost data to existing blog format
    blog.value = transformGhostToFeed(ghostResponse)
  } catch (err) {
    error.value = err
    console.error('Ghost blog fetch error:', err)
  } finally {
    pending.value = false
  }
})

// Ghost site link
const ghostLink = { href: 'https://your-ghost-site.ghost.io' }
</script>

<template>
  <div class="min-h-70vh bg-white">
    <Section class="bg-white" padding>
      <div class="py-4 flex md:flex-row flex-col mt-20">
        <div class="flex-none mb-4 md:mb-0">
          <Heading type="h4" class="uppercase color-brand-3">
            Ghost CMS Content
          </Heading>
          <p class="max-w-50ch text-pretty prose p1 color-brand-3">Latest content powered by Ghost CMS for comparison.</p>
        </div>
      </div>

      <!-- Loading State -->
      <div v-if="pending" class="text-center py-12">
        <div class="text-6xl mb-4 animate-spin">👻</div>
        <Heading type="h3" class="mb-4">Loading Ghost Posts</Heading>
        <p class="color-brand-3">Fetching content from Ghost CMS...</p>
      </div>

      <!-- Error State -->
      <div v-else-if="error" class="text-center py-12">
        <div class="text-6xl mb-4">🚫</div>
        <Heading type="h3" class="mb-4">Ghost CMS Unavailable</Heading>
        <p class="mb-6 color-brand-3">We're having trouble connecting to Ghost CMS right now.</p>
        <div class="space-y-2 text-sm color-brand-3">
          <p><strong>Possible issues:</strong></p>
          <p>• Ghost URL not configured</p>
          <p>• Invalid API key</p>
          <p>• Ghost site is down</p>
        </div>
        <Btn href="/blog" text="View Medium Blog" class="mt-4" />
      </div>

      <!-- Success State -->
      <div v-else class="blog-cell grid gap-4 lg:cols-3 md:cols-2">
        <BlogCard
          v-for="item in blog?.items || []"
          :key="item.title"
          :item="item"
          class="grid-rows-subgrid"
          show-snippet
        />
        
        <!-- Empty state -->
        <div v-if="blog?.items?.length === 0" class="col-span-full text-center py-12">
          <div class="text-6xl mb-4">👻</div>
          <Heading type="h3" class="mb-4">No Ghost Posts Yet</Heading>
          <p class="mb-6 color-brand-3">No content found in Ghost CMS!</p>
          <Btn href="/blog" text="View Medium Blog" />
        </div>
      </div>
    </Section>
  </div>
</template>