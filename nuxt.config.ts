// 1. UPDATED nuxt.config.ts - Fix route rules and CSS loading
const PUBLIC_SITE_URL = import.meta.env.NUXT_PUBLIC_SITE_URL || 'https://storacha.network'

export default defineNuxtConfig({
  router: {
    options: {
      scrollBehaviorType: 'smooth',
    },
  },

  css: [
    '@unocss/reset/tailwind.css',
    // ✅ ADD YOUR GHOST RESET CSS HERE
    '~/assets/css/ghost-reset.css'
  ],

  modules: [
    '@nuxt/eslint',
    '@vueuse/nuxt',
    '@unocss/nuxt',
    '@nuxtjs/fontaine',
    '@nuxtjs/plausible',
    '@nuxtjs/seo',
    '@nuxt/image',
    '@nuxt/scripts',
  ],

  nitro: {
    output: {
      dir: 'dist' 
    },
    preset: 'cloudflare-pages',
    compatibilityDate: '2024-07-02',
    // ✅ Clean up nitro route rules - remove duplicates
    routeRules: {
      // Only block obvious asset requests from being treated as ghost posts
      '/ghost/**/*.css': { redirect: '/404' },
      '/ghost/**/*.js': { redirect: '/404' },
      '/ghost/**/*.map': { redirect: '/404' },
      '/ghost/**/*.json': { redirect: '/404' },
      '/ghost/**/*.ico': { redirect: '/404' },
      '/ghost/**/*.png': { redirect: '/404' },
      '/ghost/**/*.jpg': { redirect: '/404' },
      '/ghost/**/*.jpeg': { redirect: '/404' },
      '/ghost/**/*.gif': { redirect: '/404' },
      '/ghost/**/*.svg': { redirect: '/404' },
      '/ghost/**/*.woff': { redirect: '/404' },
      '/ghost/**/*.woff2': { redirect: '/404' },
      '/ghost/**/*.ttf': { redirect: '/404' },
      '/ghost/**/*.eot': { redirect: '/404' },
      '/ghost/assets/**': { redirect: '/404' },
      '/ghost/static/**': { redirect: '/404' },
      '/ghost/_nuxt/**': { redirect: '/404' },
      '/ghost/api/**': { redirect: '/404' },
    }
  },

  // ✅ MAIN ROUTE RULES - Consolidated and fixed
  routeRules: {
    // Homepage
    '/': { prerender: true },
    
    // Ghost CSS endpoint - CRITICAL for Cloudflare
    '/api/ghost/styles': { 
      headers: { 
        'cache-control': 'public, max-age=7200, s-maxage=86400',
        'content-type': 'text/css; charset=utf-8'
      },
      cors: true 
    },
    
    // Ghost API routes
    '/api/ghost': { 
      isr: 300, // 5 minutes - faster updates
      headers: { 'cache-control': 'public, max-age=180, s-maxage=900' }
    },
    '/api/ghost/**': { 
      isr: 600, // 10 minutes  
      headers: { 'cache-control': 'public, max-age=300, s-maxage=1800' }
    },
    
    // Ghost pages
    '/ghost': { 
      isr: 900, // 15 minutes
      headers: { 'cache-control': 'public, max-age=300, s-maxage=900' }
    },
    '/ghost/**': { 
      isr: true,
      headers: { 'cache-control': 'public, max-age=600, s-maxage=3600' }
    },
    
    // Your existing pages
    '/blog': { prerender: true },
    '/referrals': { prerender: true },
    '/ecosystem': { prerender: true },
    '/node-providers': { prerender: true },
    '/roadmap': { prerender: true },
    '/referred': { prerender: true },
    
    // Webhook endpoint
    '/api/revalidate-ghost': { 
      headers: { 'cache-control': 'no-cache' },
      cors: true 
    },
  },

  // Rest of your config remains the same...
  app: {
    head: {
      link: [
        { rel: 'apple-touch-icon', sizes: '180x180', href: '/apple-touch-icon.png' },
        { rel: 'icon', type: 'image/png', sizes: '32x32', href: '/favicon-32x32.png' },
        { rel: 'icon', type: 'image/png', sizes: '16x16', href: '/favicon-16x16.png' },
        { rel: 'icon', type: 'image/png', sizes: '192x192', href: '/android-chrome-192x192.png' },
        { rel: 'icon', type: 'image/png', sizes: '512x512', href: '/android-chrome-512x512.png' },
        { rel: 'manifest', href: '/site.webmanifest' }
      ]
    }
  },

  eslint: {
    config: {
      standalone: false,
    },
  },

  typescript: {
    typeCheck: true,
  },

  features: {
    inlineStyles: false,
  },

  ogImage: {
    compatibility: {
      prerender: {
        chromium: false,
      },
    },
  },

  experimental: {
    // TODO: fix payload extraction for IPFS hosting
    // payloadExtraction: false,
  },

  sitemap: {
    discoverImages: true,
    exclude: [
      '/__nuxt_island/**',
      '/api/**',
      '/_nuxt/**',
      '/ghost/**/*.css',
      '/ghost/**/*.map',
      '/ghost/**/*.js',
      '/ghost/assets/**',
    ],
    defaults: {
      changefreq: 'monthly',
      priority: 0.7,
    },
    routes: async () => {
      const routes = [
        {
          url: '/',
          changefreq: 'weekly',
          priority: 1.0,
        },
        {
          url: '/referrals',
          changefreq: 'monthly',
          priority: 0.9,
        },
        {
          url: '/ecosystem',
          changefreq: 'monthly',
          priority: 0.9,
        },
        {
          url: '/node-providers',
          changefreq: 'monthly',
          priority: 0.9,
        },
        {
          url: '/blog',
          changefreq: 'weekly',
          priority: 0.8,
        },
        {
          url: '/ghost',
          changefreq: 'weekly',
          priority: 0.8,
        },
        {
          url: '/roadmap',
          changefreq: 'monthly',
          priority: 0.8,
        },
        {
          url: '/referred',
          changefreq: 'monthly',
          priority: 0.6,
        },
      ]

      try {
        const ghostPosts = await $fetch('/api/ghost')
        if (ghostPosts?.posts) {
          const ghostRoutes = ghostPosts.posts.map((post: any) => ({
            url: `/ghost/${post.slug}`,
            changefreq: 'monthly',
            priority: 0.7,
            lastmod: post.updated_at
          }))
          routes.push(...ghostRoutes)
        }
      } catch (error) {
        console.warn('Could not fetch Ghost posts for sitemap:', error)
      }

      return routes
    },
    sitemapSize: 45000,
  },

  fontMetrics: {
    fonts: ['Epilogue', 'DM Sans', 'DM Mono'],
  },

  site: {
    url: PUBLIC_SITE_URL,
    name: 'Storacha - Decentralized Hot Storage Layer on Filecoin',
    description: 'Storacha is a decentralized hot storage network for data at scale, offering user-owned data with decentralized permissioning and leveraging Filecoin and IPFS. Rebranded from web3.storage.',
    defaultLocale: 'en-US',
    identity: {
      type: 'Organization',
    },
    twitter: '@storachanetwork',
  },

  runtimeConfig: {
    // Private runtime config (server-side only)
    ghostWebhookSecret: process.env.GHOST_WEBHOOK_SECRET,
    ghostContentApiKey: process.env.GHOST_CONTENT_API_KEY,

    // Public runtime config
    public: {
      blogFeedUrl: 'https://medium.com/feed/@storacha',
      consoleUrl: import.meta.env.NUXT_PUBLIC_CONSOLE_URL || 'https://console.storacha.network',
      ghostUrl: import.meta.env.NUXT_PUBLIC_GHOST_URL || '',
      ghostContentApiKey: import.meta.env.NUXT_PUBLIC_GHOST_CONTENT_API_KEY || '',
    },
  },

  plausible: {
    autoOutboundTracking: true,
  },

  unocss: {
    nuxtLayers: true,
  },

  devtools: {
    enabled: true,
  },

  compatibilityDate: '2024-07-02',
})