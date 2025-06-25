<script setup lang="ts">
const start = useActions('start')
const docs = useActions('docs')

// SEO metadata for roadmap page
useSeoMeta({
  title: 'Roadmap | Storacha Development Plans & Future Features',
  description: 'Explore Storacha\'s roadmap and see what\'s coming next for decentralized storage. Igniting the path to high-performance, user-owned data storage.',
  ogTitle: 'Storacha Roadmap - Igniting the Future of Storage',
  ogDescription: 'See what\'s coming next for Storacha\'s blazing-fast decentralized storage platform.',
  ogImage: '/img/roadmap/roadmap-og.jpg',
  keywords: 'storacha roadmap, development plans, decentralized storage future, blockchain storage roadmap, filecoin IPFS',
})

// Structured data for roadmap page
useHead({
  script: [{
    type: 'application/ld+json',
    innerHTML: JSON.stringify({
      "@context": "https://schema.org",
      "@type": "WebPage",
      "name": "Storacha Development Roadmap",
      "description": "Explore Storacha's roadmap and development plans for the future of decentralized storage.",
      "url": "https://storacha.network/roadmap",
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
          "name": "Roadmap",
          "item": "https://storacha.network/roadmap"
        }]
      },
      "mainEntity": {
        "@type": "Plan",
        "name": "Storacha Development Roadmap",
        "description": "Strategic development plan for Storacha's decentralized storage platform",
        "creator": {
          "@type": "Organization",
          "name": "Storacha Network"
        }
      }
    })
  }]
})
</script>

<template>
  <TransitionProvider>
    <Section class="roadmap-bg bg-brand-2">
      <Hero
        class="min-h-150"
        eyebrow="Learn More"
        title="Roadmap"
        description="Igniting the path to decentralized storage"
        :actions="[start, { text: 'Learn More', href: docs.href, secondary: true }]"
      />
    </Section>
    <Section full-width>
      <Split>
        <SplitCell :bg="{ outer: 'bg-brand-2', inner: 'about-bg' }" />
        <SplitCell :bg="{ outer: 'bg-white' }" padding>
          <div class="flex items-center color-brand-3">
            <div>
              <Heading type="h2" class="font-medium">
                About Storacha
              </Heading>
              <div class="prose p1">
                <p>
                  At Storacha, we're setting the storage world on fire! Storacha is a cutting-edge, decentralized hot storage solution designed to give you blazing-fast access to your data without relying on traditional, centralized systems. We're all about true data freedom, where you own your data and control who gets to see it.
                </p>
                <p>
                  Our mission is to deliver a high-performance, intuitive solution that outshines the old ways of storage. Whether you're storing gaming assets, multimedia content, or blockchain data, Storacha has you covered.
                </p>
                <p>
                  We balance decentralization with performance through:
                </p>
                <ul>
                  <li>Open Access: Anyone can join and contribute.</li>
                  <li>Easy Exit: Data owners can move their data anytime.</li>
                </ul>
                <p>Turn up the heat with Storacha and spark the future of decentralized storage.</p>
              </div>
            </div>
          </div>
        </SplitCell>
      </Split>
    </Section>
    <Section class="bg-brand-4 color-brand-3 !pb-0" full-width padding>
      <Roadmap />
    </Section>
  </TransitionProvider>
</template>

<style lang="postcss">
.about-bg {
  background: url(/img/roadmap/about.png) no-repeat center center;
  background-size: contain;
}
@screen md {
  .roadmap-bg {
    background-image: url(/img/roadmap/hero.png);
    background-position: right bottom;
    background-repeat: no-repeat;
    background-size: auto 100%;
  }
}
</style>