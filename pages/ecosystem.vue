<!-- pages/ecosystem.vue -->
<script lang="ts" setup>
useSeoMeta({
  title: 'Storacha Ecosystem | Decentralized Storage Partners',
  description: 'Discover how innovative projects are leveraging Storacha\'s blazing-fast, secure, and scalable hot storage solution to push the boundaries of what\'s possible.',
  ogTitle: 'Storacha Ecosystem Partners & Integrations',
  ogDescription: 'Explore the growing ecosystem of projects building on Storacha\'s decentralized storage network.',
  ogImage: '/img/ecosystem/ecosystem-og.jpg',
  keywords: 'storacha ecosystem, decentralized storage, partners, integrations, web3, filecoin, IPFS',
})

// Add page-specific structured data
useHead({
  script: [{
    type: 'application/ld+json',
    innerHTML: JSON.stringify({
      "@context": "https://schema.org",
      "@type": "WebPage",
      "name": "Storacha Ecosystem",
      "description": "Discover how innovative projects are leveraging Storacha's blazing-fast, secure, and scalable hot storage solution.",
      "url": "https://storacha.network/ecosystem",
      "isPartOf": {
        "@type": "WebSite",
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
          "name": "Ecosystem",
          "item": "https://storacha.network/ecosystem"
        }]
      }
    })
  }]
})
</script>

<template>
  <TransitionProvider>
    <Section class="ecosystem-bg bg-brand-4">
      <Hero
        class="min-h-150 lg:min-h-180"
        eyebrow="Learn More"
        title="Storacha Ecosystem"
        description="Discover how innovative projects are leveraging Storacha's blazing-fast, secure, and scalable hot storage solution to push the boundaries of what's possible."
      />
    </Section>
    <Section class="bg-white" padding>
      <EcosystemGrid />
    </Section>
  </TransitionProvider>
</template>

<style lang="postcss" scoped>
@screen md {
  .ecosystem-bg {
    background: url(/img/ecosystem/hero.png) no-repeat bottom right 10%;
    background-size: auto 75%;
  }
}
@screen lg {
  .ecosystem-bg {
    background-size: auto 78%;
  }
}
@screen xl {
  .ecosystem-bg {
    background-size: auto 90%;
  }
}
</style>