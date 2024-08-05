<script lang="ts" setup>
const UPSs = [
  {
    icon: '🔥',
    title: 'Kickstart your projects',
    description: `Storacha takes the headache out of development. It's so easy to use that you'll be up and running in no time. Forget the boring stuff and dive straight into innovation!`,
  },
  {
    icon: '🔥🔥',
    title: 'Scale Like a Boss',
    description: `With Storacha's spicy indexing and content discovery, scaling is a breeze. No more wrestling with infrastructure – just smooth, effortless growth.`,
  },
  {
    icon: '🔥🔥🔥',
    title: 'Blazing Fast Performance',
    description: `Ultra-high storage throughput and super low retrieval times. Whether it's small files or massive data chunks, Storacha serves it hot and fast!`,
  },
  {
    icon: '🔥🔥🔥🔥',
    title: 'Truly Decentralized',
    description: `With decentralized identity, you have true data ownership and can fine-tune permissions to decide who can do what with your data.`,
  },
]
</script>

<template>
  <div class="grid grid-cols-1 gap-8 md:grid-cols-4">
    <div
      v-for="{ icon, title, description } in UPSs"
      :key="title"
      class="grid row-span-3 grid-rows-subgrid gap-4"
    >
      <div class="h3">
        {{ icon }}
      </div>
      <Heading type="h3" class="uppercase">
        {{ title }}
      </Heading>
      <p class="p1">
        {{ description }}
      </p>
    </div>
  </div>
</template>

<style>

</style>
