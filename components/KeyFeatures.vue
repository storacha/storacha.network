<script lang="ts" setup>
const cards = [{
  title: 'Easy Client Libraries and CLI',
  subTitle: 'Get Started in a Flash',
  icon: '🚀',
  description: 'With our simple client libraries and command-line interface, you’ll be up and running in no time. Or, use the HTTP interface to build in any programming language you like.',
}, {
  title: 'IPFS Compatible',
  subTitle: 'Seamless Integration',
  icon: 'i-simple-icons:ipfs',
  description: 'Your data can be discovered and retrieved from other IPFS  nodes, making everything play nicely together.',
}, {
  title: 'CDN-Level Retrieval Speeds',
  subTitle: 'Blazing Fast Access',
  icon: '⚡',
  description: 'Enjoy lightning-fast retrieval speeds that rival CDNs, so your data is always at your fingertips in an instant.',
}, {
  title: 'Content Addressing',
  subTitle: 'Rock-Solid Integrity',
  icon: '🔒',
  description: 'Each piece of data gets a unique content address, ensuring everything is secure and verifiable. No more worries about data integrity!',
}, {
  title: 'Filecoin Storage',
  subTitle: 'Solid Backup',
  icon: '🏢',
  status: 'Future',
  description: 'Each piece of data gets a unique content address, ensuring everything is secure and verifiable. No more worries about data integrity!',
}, {
  title: 'Redundancy',
  subTitle: 'Extra Layer of Safety',
  icon: '🛡️',
  description: 'Your data is reliably retrievable and stored on multiple storage providers as well as on Filecoin, all backed by cryptographic proofs. Double the security, double the peace of mind.',
}, {
  title: 'Large Data Sharding',
  subTitle: 'Handle Big Data Like a Pro',
  icon: '🗂️',
  description: 'Break down massive datasets into manageable pieces with large data sharding, boosting performance and scalability.',
}, {
  title: 'User-Owned Data',
  subTitle: 'You’re in Control',
  icon: '🔑',
  description: 'With decentralized identity, authentication, and permissioning using UCANs (User Controlled Authorization Networks), you decide who gets to do what with your data.',
}, {
  title: '99.9% Availability',
  subTitle: 'Always On',
  icon: '📈',
  description: 'Enjoy 99.9% uptime, ensuring your data is always there when you need it.',
}]
</script>

<template>
  <GridSection
    class="key-features"
    title="Key Features"
    description="Check out how we’re cranking up the heat with upcoming features and innovations to make your data storage experience scorching hot!"
  >
    <CardCell v-for="card in cards" :key="card.title" class="card bg-brand-4 color-brand-3">
      <div class="pill h-3em w-3em flex-inline items-center justify-center rounded-full bg-white">
        <div v-if="card.icon.startsWith('i-')" :class="card.icon" />
        <span v-else>{{ card.icon }}</span>
      </div>
      <div class="card-body mt-6 color-brand-3">
        <Heading type="h3" class="font-medium">
          {{ card.title }}
        </Heading>
        <Heading type="h5" class="mt-6 uppercase">
          {{ card.subTitle }}
        </Heading>
        <p class="mt-6 text-sm p1 sm:text-base">
          {{ card.description }}
        </p>
      </div>
    </CardCell>
  </GridSection>
</template>

<style lang="postcss" scoped>
.pill {
  @apply color-brand-3 text-base sm:text-lg;
}
</style>
