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
  ],

  modules: [
    '@nuxt/eslint',
    '@vueuse/nuxt',
    '@unocss/nuxt',
    '@nuxtjs/fontaine',
    '@nuxtjs/plausible',
    '@nuxtjs/seo',
    '@nuxtjs/robots',  
    '@nuxtjs/sitemap',
    '@nuxt/image',
    '@nuxt/scripts',
  ],

  nitro: {
    output: {
      dir: 'dist' 
    }
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
    // disable playwright and chromium binary downloads
    // https://nuxtseo.com/og-image/guides/chromium#prerenderer-ci-chromium
    compatibility: {
      prerender: {
        chromium: false,
      },
    },
  },

  experimental: {
    // TODO: fix payload extraction for IPFS hosting
    // see: https://github.com/nuxt/nuxt/issues/19478
    // payloadExtraction: false,
  },

// Replace your existing sitemap configuration with this:
  sitemap: {
    // Enable image discovery for better SEO
    discoverImages: true,
    
    // Exclude these routes from the sitemap
    exclude: [
      '/__nuxt_island/**',
      '/api/**',        // API routes
      '/_nuxt/**',      // Build assets
    ],
    
    // Default settings for all pages (removed lastmod anti-pattern)
    defaults: {
      changefreq: 'monthly',
      priority: 0.7,
    },
    
    // Custom configuration for specific routes
    routes: async () => {
      return [
        // Homepage - highest priority
        {
          url: '/',
          changefreq: 'weekly',
          priority: 1.0,
        },
        
        // Main navigation pages - high priority for sitelinks
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
          url: '/roadmap',
          changefreq: 'monthly',
          priority: 0.8,
        },
        {
          url: '/referred',
          changefreq: 'monthly',
          priority: 0.6, // Lower priority for referred page
        },
      ]
    },
    
    // Split large sitemaps
    sitemapSize: 45000, // Max URLs per sitemap file
  },

  // Optimized robots.txt for SEO
  robots: {
    UserAgent: '*',
    Allow: '/',
    Disallow: [
      '/api/**',      // Block API endpoints to save crawl budget
      '/_nuxt/**',    // Block Nuxt build assets
    ],
    Sitemap: `${PUBLIC_SITE_URL}/sitemap.xml`,
    Host: PUBLIC_SITE_URL,
  },

  fontMetrics: {
    // reduce CLS by calculating font metrics ahead of load
    fonts: ['Epilogue', 'DM Sans', 'DM Mono'],
  },

  site: {
    // @nuxtjs/seo
    // @see https://nuxtseo.com/site-config/api/config
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
    // public runtime config
    public: {
      // feed URL used for /api/blog
      blogFeedUrl: 'https://medium.com/feed/@storacha',
      consoleUrl: import.meta.env.NUXT_PUBLIC_CONSOLE_URL || 'https://console.storacha.network',
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