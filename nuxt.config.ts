// https://nuxt.com/docs/api/configuration/nuxt-config

const PUBLIC_SITE_URL = import.meta.env.NUXT_PUBLIC_SITE_URL || 'https://storacha.network'

export default defineNuxtConfig({
  router: {
    options: {
      scrollBehaviorType: 'smooth',
    },
  },

  css: [
    '@unocss/reset/tailwind.css',
    // Add Ghost CSS AFTER the reset - this is crucial!
    '~/assets/css/ghost-reset.css',
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
    compatibilityDate: '2024-07-02'
  },

  // ✅ Enhanced ISR route rules with Ghost CSS caching
  routeRules: {
    // Homepage - pre-rendered at build time
    '/': { prerender: true },
    
    // Ghost CSS endpoint - aggressive caching for performance
    '/api/ghost/styles': { 
      isr: false, // Don't use ISR for CSS - use direct caching
      headers: { 
        'cache-control': 'public, max-age=3600, s-maxage=86400', // 1hr browser, 24hr CDN
        'content-type': 'text/css',
        'x-ghost-cache': 'enabled'
      },
      cors: true 
    },
    
    // Ghost API routes - moderate caching
    '/api/ghost': { 
      isr: true,
      headers: { 'cache-control': 'public, max-age=300, s-maxage=1800' } // 5min browser, 30min CDN
    },
    '/api/ghost/**': { 
      isr: true,
      headers: { 'cache-control': 'public, max-age=600, s-maxage=3600' } // 10min browser, 1hr CDN
    },
    
    // Ghost blog listing - ISR with 30 minute cache
    '/ghost': { 
      isr: 1800,
      headers: { 'cache-control': 'public, max-age=300, s-maxage=1800' }
    },
    
    // Ghost blog posts - ISR until manual invalidation
    '/ghost/**': { 
      isr: true,
      headers: { 'cache-control': 'public, max-age=600, s-maxage=3600' }
    },
    
    // Your existing pages - pre-rendered
    '/blog': { prerender: true },
    '/referrals': { prerender: true },
    '/ecosystem': { prerender: true },
    '/node-providers': { prerender: true },
    '/roadmap': { prerender: true },
    '/referred': { prerender: true },
    
    // API routes for webhooks (no caching)
    '/api/revalidate-ghost': { 
      headers: { 'cache-control': 'no-cache' },
      cors: true 
    },
  },

  // Favicon and PWA configuration
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

  // Sitemap configuration (handled by @nuxtjs/seo)
  sitemap: {
    discoverImages: true,
    exclude: [
      '/__nuxt_island/**',
      '/api/**',
      '/_nuxt/**',
    ],
    defaults: {
      changefreq: 'monthly',
      priority: 0.7,
    },
    routes: async () => {
      return [
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
    // ✅ Private runtime config (server-side only)
    ghostWebhookSecret: process.env.GHOST_WEBHOOK_SECRET,
    // Add Ghost Content API key to private config for better security
    ghostContentApiKey: process.env.GHOST_CONTENT_API_KEY,

    // ✅ Public runtime config
    public: {
      // feed URL used for /api/blog
      blogFeedUrl: 'https://medium.com/feed/@storacha',
      consoleUrl: import.meta.env.NUXT_PUBLIC_CONSOLE_URL || 'https://console.storacha.network',

      // ✅ Ghost CMS configuration
      ghostUrl: import.meta.env.NUXT_PUBLIC_GHOST_URL || '',
      // Note: Content API key moved to private config for better security
      // But keep it public if your Ghost site allows it and you need client-side access
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