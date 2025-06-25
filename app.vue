<!-- app.vue -->
<script setup lang="ts">
defineOgImage({ 
  url: '/img/storacha-og-card.png', 
  width: 1200, 
  height: 630, 
  alt: 'Storacha - Decentralized Hot Storage Layer on Filecoin' 
})

// Get header links from app config
const { headerLinks } = useAppConfig().actions

// Create navigation items for schema, handling dropdowns
const navItems = headerLinks.flatMap(link => {
  if (link.href) {
    return {
      '@type': 'WebPage',
      'name': link.text,
      'url': link.href.startsWith('http') 
        ? link.href 
        : `https://storacha.network${link.href}`
    }
  }
  if (link.dropdown) {
    // Include main category and dropdown items
    return [
      {
        '@type': 'WebPage',
        'name': link.text,
        'url': 'https://storacha.network/' // Main category URL
      },
      ...link.dropdown.map(item => ({
        '@type': 'WebPage',
        'name': item.text,
        'url': item.href.startsWith('http') 
          ? item.href 
          : `https://storacha.network${item.href}`
      }))
    ]
  }
  return []
}).filter(Boolean)

// Add structured data for site navigation
useHead({
  script: [{
    type: 'application/ld+json',
    innerHTML: JSON.stringify({
      '@context': 'https://schema.org',
      '@type': 'WebSite',
      'url': 'https://storacha.network/',
      'name': 'Storacha Network',
      'description': 'Decentralized hot storage network for data at scale, offering user-owned data with decentralized permissioning and leveraging Filecoin and IPFS.',
      'potentialAction': {
        '@type': 'SearchAction',
        'target': 'https://storacha.network/search?q={search_term_string}',
        'query-input': 'required name=search_term_string'
      },
      'mainEntity': {
        '@type': 'SiteNavigationElement',
        '@id': '#main-navigation',
        'name': 'Main Navigation',
        'url': 'https://storacha.network/',
        'hasPart': navItems
      }
    })
  }]
})
</script>

<template>
  <NuxtLoadingIndicator color="#BDE0FF" style="opacity: 1;" />
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
  <DevOnly>
    <Debug />
  </DevOnly>
</template>

<style lang="postcss">
html {
  @apply antialiased bg-brand-4;
}

p a {
  @apply transform decoration-1 decoration-gray/50 underline underline-offset-3;
}

p a:hover {
  @apply decoration-gray decoration-2;
}

footer a:hover {
  @apply underline;
}
</style>