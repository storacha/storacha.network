<script lang="ts" setup>
import MailingListSignup from '~/components/MailingListSignup.vue'

// SEO metadata for node providers page
useSeoMeta({
  title: 'Node Providers | Join the Storacha Network',
  description: 'Join the waitlist to be the first to participate as a node provider on the Storacha network. Run storage, retrieval, or indexing nodes and earn rewards.',
  ogTitle: 'Storacha Node Providers - Join the Network',
  ogDescription: 'Be the first to run nodes on Storacha\'s decentralized storage network and earn rewards.',
  ogImage: '/img/node-providers/node-providers-og.jpg',
  keywords: 'storacha node providers, run storage nodes, decentralized network, earn rewards, blockchain infrastructure',
})

// Structured data for node providers page
useHead({
  script: [{
    type: 'application/ld+json',
    innerHTML: JSON.stringify({
      "@context": "https://schema.org",
      "@type": "WebPage",
      "name": "Storacha Node Providers",
      "description": "Join the waitlist to be the first to participate as a node provider on the Storacha network.",
      "url": "https://storacha.network/node-providers",
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
          "name": "Node Providers",
          "item": "https://storacha.network/node-providers"
        }]
      }
    })
  }]
})

const discord = useSocialNetwork('discord')
const nodeWaitlist = useActions('nodeWaitlist')

const nodes = [{
  id: 'storage',
  title: 'Storage Node',
  description: 'The first nodes to roll-out: Spice up Storacha storage by running our first hotshot nodes! Keep Storacha\'s data sizzling and accessible, and in exchange you\'ll rack up rewards!',
}, {
  id: 'retrieval',
  title: 'Retrieval Node',
  description: 'Coming soon: Our lightning-fast Retrieval Nodes! Run a node to cache and fetch data effortlessly, serving users and earning you rewards. Stay tuned - the rewards will be worth it!',
}, {
  id: 'indexing',
  title: 'Indexing Node',
  description: 'Coming soon: Our Indexing Nodes will track data locations, helping users find what they need. Get excited - they\'re on the way!',
}]
</script>

<template>
  <TransitionProvider>
    <Section class="node-providers-bg bg-brand-4">
      <Hero
        class="min-h-150 lg:min-h-160"
        eyebrow="Get Started"
        title="Node Providers"
        description="Join the waitlist to be the first to participate!"
        :actions="[
          { mailingList: nodeWaitlist, asComponent: MailingListSignup },
          { text: 'Join Community', href: discord?.href, secondary: true }]"
      />
    </Section>
    <Section full-width>
      <Split>
        <SplitCell :bg="{ outer: 'bg-brand-2', inner: 'engage-bg' }" />
        <SplitCell :bg="{ outer: 'bg-white' }" padding>
          <div class="flex items-center color-brand-3">
            <div>
              <Heading type="h2" class="font-medium">
                How can you engage?
              </Heading>
              <div class="prose p1">
                <p>
                  Storacha is open sauce. We need you. While you wait to run your own nodes, contribute in other ways:
                </p>
                <ul>
                  <li>Get started with the w3cli on Github.</li>
                  <li>Collaborate with our dev team on Discord.</li>
                  <li>Learn about the network and future node types below.</li>
                </ul>
              </div>
              <Btn href="https://github.com/storacha/w3cli">
                Get Started!
              </Btn>
            </div>
          </div>
        </SplitCell>
      </Split>
    </Section>
    <Section class="bg-brand-4" padding>
      <div class="color-brand-3">
        <SectionHeader
          eyebrow="Storacha Network"
          title="Types of Nodes"
          center
        />
      </div>
      <div class="grid grid-cols-1 mt-12 gap-4 sm:grid-cols-3">
        <Card v-for="node in nodes" :key="node.title" :title="node.title">
          <div class="flex flex-col gap-8">
            <Heading type="h3" class="hidden text-center font-medium">
              {{ node.title }}
            </Heading>
            <div class="min-h-30 flex items-center justify-center">
              <img :src="`/img/nodes/${node.id}.png`" :alt="node.title" class="max-h-24">
            </div>
            <p class="font-sans p1">
              {{ node.description }}
            </p>
          </div>
        </Card>
      </div>
    </Section>
    <Section full-width>
      <Split>
        <SplitCell :bg="{ outer: 'bg-white' }" padding>
          <div class="flex items-center color-brand-3">
            <div>
              <Heading type="h2" class="font-medium">
                Recommended Hardware
              </Heading>
              <div class="prose p1">
                <p>
                  The Storacha network doesn't discriminate. Got a solid home server, or a sleek setup in a data center? As long as you have a trusty internet connection, you're in! We're here to make joining the party easy for everyone. Detailed hardware recommendations will be served hot with each new node type release. Stay tuned and follow us on Discord and X!
                </p>
              </div>
            </div>
          </div>
        </SplitCell>
        <SplitCell :bg="{ outer: 'bg-brand-2', inner: 'hardware-bg' }" />
      </Split>
    </Section>
  </TransitionProvider>
</template>

<style lang="postcss">
.engage-bg {
  background: url(/img/node-providers/engage.png) no-repeat bottom;
  background-size: contain;
}
.hardware-bg {
  background: url(/img/node-providers/hardware.png) no-repeat bottom;
  background-size: contain;
}
@screen lg {
  .node-providers-bg {
    background: url(/img/node-providers/hero.png) no-repeat bottom right;
    background-size: auto 80%;
  }
}
@screen xl {
  .node-providers-bg {
    background-size: auto 95%;
  }
}
</style>