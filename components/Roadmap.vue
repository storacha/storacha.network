<script lang="ts" setup>
const cards = [{
  name: 'Milestone 1',
  status: 'In Progress',
  active: true,
  title: 'From centralized storage to trusted storage network',
  description: 'Following this, a transition from a centralized storage model to a platform-neutral network of trusted nodes is underway. This shift lays the groundwork for a permissionless storage protocol, enhances integration with Filecoin L1 providers, and aligns with web3-native use cases.',
}, {
  name: 'Milestone 2',
  status: 'Up Next',
  title: 'Permissioned hot storage network with early participation',
  description: 'The storage node network is expanding to include third-party nodes on a permissioned basis, i.e. Filecoin L1 Storage Providers (SPs) or previous Saturn node providers. A verification system is being implemented to ensure that third-party providers maintain service guarantees. This system is crucial as it provides users with necessary proofs of service integrity.',
}, {
  name: 'Milestone 3',
  status: 'Future',
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
  <div class="flex flex-col gap-12 2xl:grid-margins sm:flex-row">
    <div class="w-80 px-6">
      <Heading type="h3" class="color-brand-3 font-medium">
        Our Sizzling Roadmap
      </Heading>
      <p class="mt-4 text-base color-brand-3 p1">
        Check out how we’re cranking up the heat with upcoming features and innovations to make your data storage experience scorching hot!
      </p>
    </div>
    <div class="cards">
      <div v-for="card in cards" :key="card.name" class="card p-8">
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
      </div>
    </div>
  </div>
</template>

<style lang="postcss" scoped>
.pill span {
  @apply color-brand-4;
}
.pill-active span {
  @apply color-brand-3 bg-brand-4;
}
.cards {
  cursor: grab;
  display: grid;
  grid-auto-columns: calc(100% - 2rem);
  grid-column-gap: 10px;
  grid-auto-flow: column;
  list-style: none;
  overflow-x: scroll;
  scroll-snap-type: x mandatory;
  width: 100%;

}
.card:first-child {
  margin-left: 1rem;
}

.card:last-child {
  margin-right: 1rem;
}

.card {
  display: flex;
  flex-direction: column;
  border-radius: 12px;
  scroll-snap-align: center;
  transition: all 0.2s;
  @apply bg-brand-3;
}

.cards::-webkit-scrollbar {
  display: none;
}

@media (min-width: 1000px) {
  .card {
    margin-bottom: 1rem;
  }
  .cards::-webkit-scrollbar {
    height: 12px;
    display: block;
  }

  .cards::-webkit-scrollbar-thumb,
  .cards::-webkit-scrollbar-track {
    border-radius: 92px;
  }

  .cards::-webkit-scrollbar-thumb {
    @apply bg-brand-3;
  }

  .cards::-webkit-scrollbar-track {
    background: #f1f1f1;
  }
  .cards {
    grid-auto-columns: calc(50% - 5rem);
    grid-column-gap: 20px;
  }
}
</style>
