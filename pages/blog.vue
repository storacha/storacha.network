<script lang="ts" setup>
import type { Feed } from '~/types/blog'

// SEO metadata for the blog page
useSeoMeta({
  title: 'Blog | Latest News from Storacha Network',
  description: 'Stay updated with the latest news, updates, and insights from the Storacha team.',
  ogTitle: 'Storacha Blog - Latest News & Updates',
  ogDescription: 'Read the latest from Storacha about decentralized storage, web3 innovations, and platform updates.',
  ogImage: '/img/blog-og.jpg',
  keywords: 'storacha blog, decentralized storage news, web3, blockchain, filecoin, IPFS',
})

// Structured data for the blog
useHead({
  script: [{
    type: 'application/ld+json',
    innerHTML: JSON.stringify({
      "@context": "https://schema.org",
      "@type": "Blog",
      "name": "Storacha Blog",
      "description": "Latest news, updates, and insights from the Storacha team.",
      "url": "https://storacha.network/blog",
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
          "name": "Blog",
          "item": "https://storacha.network/blog"
        }]
      }
    })
  }]
})

// 🔥 CLIENT-SIDE ONLY - No SSR issues on CF Pages
const { data: blog, error, pending } = await useLazyFetch<Feed>('/api/blog', {
  default: () => ({ items: [] }),
  server: false, // This prevents any server-side execution
})

const medium = useSocialNetwork('medium')
</script>

<template>
  <Section class="bg-white" padding>
    <div class="py-4 flex md:flex-row flex-col mt-20">
      <div class="flex-none mb-4 md:mb-0">
        <Heading type="h4" class="uppercase color-brand-3">
          Blazing Hot News
        </Heading>
        <p class="max-w-50ch text-pretty prose p1 color-brand-3">The latest and greatest from the Storacha team.</p>
      </div>
      <div class="flex-auto md:text-right">
        <Btn text="Follow on Medium" :href="medium?.href" />
      </div>
    </div>

    <!-- Loading State -->
    <div v-if="pending" class="text-center py-12">
      <div class="text-6xl mb-4 animate-spin">🔄</div>
      <Heading type="h3" class="mb-4">Loading Latest Posts</Heading>
      <p class="color-brand-3">Fetching the hottest content from our blog...</p>
    </div>

    <!-- Error State -->
    <div v-else-if="error" class="text-center py-12">
      <div class="text-6xl mb-4">📱</div>
      <Heading type="h3" class="mb-4">Blog Temporarily Unavailable</Heading>
      <p class="mb-6 color-brand-3">We're having trouble loading our latest posts right now.</p>
      <Btn href="https://medium.com/@storacha" text="Visit Medium" class="btn bg-brand-3 text-white" external />
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
        <div class="text-6xl mb-4">📝</div>
        <Heading type="h3" class="mb-4">No Posts Yet</Heading>
        <p class="mb-6 color-brand-3">Check back soon for hot new content!</p>
        <Btn href="https://medium.com/@storacha" text="Follow on Medium" class="btn bg-brand-3 text-white" external />
      </div>
    </div>
  </Section>
</template>