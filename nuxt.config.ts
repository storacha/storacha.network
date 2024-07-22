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

  eslint: {
    config: {
      standalone: false,
    },
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

  sitemap: {
    discoverImages: false,
    exclude: [
      '/__nuxt_island/**',
    ],
  },

  fontMetrics: {
    // reduce CLS by calculating font metrics ahead of load
    fonts: ['DM Sans', 'Epilogue'],
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
    splash: false,
  },

  plausible: {
    autoOutboundTracking: true,
  },

  runtimeConfig: {
    public: {
      site: {
        // nuxt-site-config runtime overrides/defaults
        twitter: 'storachanetwork',
        medium: 'storacha',
        email: 'hello@storacha.network',
      },
      mailingListUrl: 'https://945c6cfe.sibforms.com/serve/MUIFAJsqje9uA4owcVGYYaQWZarreW_oOzT9j0aXOY1QcOdsXQ7ZjvWvrpXKqNm9sBilY3Pum8s9CyPAkA2ELLEyJp3DVvzEDFg-Ov967IegSH6PXRAG6ulFhavIwebzTu3XsMZbpnyWbsDp5hexye1aXcFs4C9oIFFJWX2Aar8ElyUJDCPSsoeMAdj6puyREL1zUrjNpq2ZobYx',
    },
  },

  unocss: {
    nuxtLayers: true,
  },

  devtools: {
    enabled: true,
  },

  compatibilityDate: '2024-07-02',
})
