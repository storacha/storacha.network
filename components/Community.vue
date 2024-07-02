<script lang="ts" setup>
interface Network {
  name?: string
  description?: string
  url: string
  logo: string
}

const networks: Network[] = [
  { name: 'Discord', description: 'Get involved', url: 'https://discord.gg/jwANgTVjgF', logo: '/img/i-discord.svg' },
  { name: 'X', description: 'Read the latest', url: 'https://x.com/storachanetwork', logo: '/img/i-x.svg' },
  { name: 'GitHub', description: 'Build with us', url: 'https://github.com/storacha-network/', logo: '/img/i-github.svg' },
  { name: 'Reddit', description: 'See more', url: 'https://www.reddit.com/r/Storacha/', logo: '/img/i-reddit.svg' },
  { name: 'Farcaster', description: 'Join discussion', url: 'https://warpcast.com/storacha', logo: '/img/i-farcaster.svg' },
]
</script>

<template>
  <div class="grid grid-cols-1 box-border gap-0 md:grid-cols-2">
    <div class="bg-brand-1 p-6 color-brand-1 md:p-12">
      <div class="s-block-inner s-block bg-brand-4 sm:float-right">
        <Heading type="h3">
          Join the Community
        </Heading>
        <div class="grid grid-cols-1 mt-8 gap-6 sm:grid-cols-2">
          <AppLink v-for="n in networks" :key="n.name" class="my-4 flex" :href="n.url" target="_blank" rel="noopener noreferrer">
            <div class="h-12 w-12 flex items-center justify-center border-1 b-brand-1 rounded-full">
              <img class="h-12 w-12 w-full p-3" :src="n.logo" :alt="n.name">
            </div>
            <div class="px-4">
              <Heading type="h4" class="font-500">
                {{ n.name }}
              </Heading>
              <p class="p3">
                {{ n.description }}
              </p>
            </div>
          </AppLink>
        </div>
      </div>
    </div>
    <div class="community-img s-block box-border">
      <div class="s-block-inner h-full border-2">
        <div class="flex flex-col justify-center" />
      </div>
    </div>
  </div>
</template>

<style scoped lang="postcss">
.s-block {
  @apply h-full max-w-3xl w-full p-6 md:p-12;
}
.s-block-inner {
  @apply rounded-3xl p-6 md:p-12;
}
.community-img {
  background-image: url('/img/community-bg.webp');
  background-size: cover;
  background-position: center;
}
</style>
