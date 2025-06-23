// https://nuxt.com/docs/api/configuration/nuxt-config

const PUBLIC_SITE_URL = import.meta.env.NUXT_PUBLIC_SITE_URL || 'https://storacha.network'

export default defineNuxtConfig({
    
  router: {
    options: {
      scrollBehaviorType: 'smooth',
    },
  },

  routeRules: {
    // excluded from sitemap and robots, remove these when populated and ready for indexing
    '/privacy': { index: false },
    '/terms': { index: false },
    // For static generation, prerender these routes
    '/ecosystem': { 
      prerender: true,
      headers: { 
        'Cache-Control': 's-maxage=3600' 
      }
    },
    '/': { 
      prerender: true,
      headers: { 
        'Cache-Control': 's-maxage=31536000' 
      }
    },
  },

  css: [
    '@unocss/reset/tailwind.css',
  ],

  modules: [
    '@nuxt/eslint',
    '@nuxt/content',
    '@vueuse/nuxt',
    '@unocss/nuxt',
    '@nuxtjs/fontaine',
    '@nuxtjs/plausible',
    '@nuxtjs/seo',
    '@nuxt/image',
    '@nuxt/scripts',
  ],

  // Content configuration for static generation with collections
  content: {
    // Default SQLite configuration works for static generation
    // During build, Content v3 will use a local SQLite database to process collections
    // The database is only used during build time, not runtime
    database: {
      type: 'sqlite',
      filename: './.nuxt/content.db'
    }
  },

  // Nitro configuration for static generation  
  nitro: {
    // Use static preset for true static site generation
    preset: 'static',
    prerender: {
      routes: ['/', '/ecosystem'],
      // Crawl all routes for static generation
      crawlLinks: true
    }
  },

  // Enhanced Vite configuration for Cloudflare + existing fix
  vite: {
    build: {
      rollupOptions: {
        external: ['unenv/runtime/mock/noop'],
        output: {
          // Optimize chunk naming for better caching
          chunkFileNames: 'chunks/[name].[hash].js',
          entryFileNames: 'entry/[name].[hash].js'
        }
      },
      // Reduce chunk size for better edge performance
      chunkSizeWarningLimit: 1000,
    },
    ssr: {
      noExternal: ['@nuxt/content']
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
    
    // Remove Cloudflare experimental features for now to ensure build works
  },

  sitemap: {
    discoverImages: false,
    exclude: [
      '/__nuxt_island/**',
    ],
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