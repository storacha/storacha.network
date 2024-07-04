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
  <div class="grid grid-cols-1 box-border gap-0 bg-brand-1 lg:grid-cols-2">
    <div class="s-block color-brand-1">
      <div class="s-block-inner flex flex-col bg-brand-4 lg:ml-a">
        <Heading type="h2" class="font-medium">
          Join the Community
        </Heading>
        <div class="my-a py-12">
          <div class="networks grid grid-flow-dense gap-12">
            <AppLink v-for="n in networks" :key="n.name" class="flex items-center hover:color-brand-3" :href="n.url">
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
    </div>
    <div class="s-block community-img">
      <div class="s-block-inner h-full border-2">
        <div class="" />
      </div>
    </div>
  </div>
</template>

<style lang="postcss">
.networks {
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
}
.s-block {
  @apply p-6 lg:p-12;
}
.s-block-inner {
  @apply rounded-3xl p-8 md:p-12 aspect-ratio-1/1;
  width: 100%;
}
.s-block > div {
  @apply lg:max-w-xl;
}
.community-img {
  background-image: url('/img/community-bg.webp');
  background-size: cover;
  background-position: bottom;
}
</style>
