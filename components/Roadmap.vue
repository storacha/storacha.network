<script lang="ts" setup>
const cards = [{
  name: 'Milestone 1',
  status: 'COMPLETED ✅',
  title: 'From centralized storage to trusted storage network',
  description: 'Following this, a transition from a centralized storage model to a platform-neutral network of trusted nodes is underway. This shift lays the groundwork for a permissionless storage protocol, enhances integration with Filecoin L1 providers, and aligns with web3-native use cases.',
}, {
  name: 'Milestone 2',
  status: 'In Progress 🔥',
  active: true,
  title: 'Permissioned hot storage network with early participation',
  description: 'The storage node network is expanding to include third-party nodes on a permissioned basis, i.e. Filecoin L1 Storage Providers (SPs) or previous Saturn node providers. A verification system is being implemented to ensure that third-party providers maintain service guarantees. This system is crucial as it provides users with necessary proofs of service integrity.',
}, {
  name: 'Milestone 3',
  status: 'Up Next',
  title: 'Permissionless hot storage layer with retrieval MVP',
  description: 'The network is transitioning to a permissionless model, allowing any node to participate in the network. This model is designed to be more inclusive and decentralized, providing a more robust and secure network. The transition to a permissionless model is a significant milestone in the development of the Storacha network.',
}, {
  name: 'Milestone 4',
  status: 'Future',
  title: 'Open and permissionless retrieval network at scale',
  description: 'In this milestone, the capabilities of the decentralized retrieval network are built upon and massively expanded. The retrieval network becomes open and permissionless to enable massive scaling, similar to the developments observed in the Saturn network. The storage network is further scaled.',
}]
</script>

<template>
  <CarouselSection
    class="roadmap"
    title="Our Sizzling Roadmap"
    description="Check out how we're cranking up the heat with upcoming features and innovations to make your data storage experience scorching hot!"
  >
    <CardCell v-for="card in cards" :key="card.name" class="card bg-brand-3">
      <div class="pill" :class="{ 'pill-active': card.active }">
        <span class="b-1 rounded-full px-4 py-2 p3 text-xs">{{ card.status }}</span>
      </div>
      <div class="card-body mt-8 color-brand-4">
        <Heading type="h3">
          {{ card.title }}
        </Heading>
        <p class="mt-6 text-sm p1 sm:text-base">
          {{ card.description }}
        </p>
      </div>
    </CardCell>
  </CarouselSection>
</template>

<style lang="postcss" scoped>
.pill span {
  @apply color-brand-4 uppercase text-xs;
}

.pill-active span {
  @apply color-brand-3 bg-brand-4;
}

/*
:deep(.carousel::-webkit-scrollbar-thumb) {
  @apply bg-brand-3;
}

:deep(.carousel::-webkit-scrollbar-track) {
  @apply bg-brand-4;
}
 */
</style>