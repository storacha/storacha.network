<script lang="ts" setup>
interface SocialNetwork {
  name?: string
  description?: string
  url: string
  icon: string
}
// define props
interface CommunityProps {
  networks: SocialNetwork[]
}
const { networks } = defineProps<CommunityProps>()
</script>

<template>
  <div class="grid grid-cols-1 box-border gap-0 bg-brand-1 lg:grid-cols-2">
    <div class="s-block color-brand-1">
      <div class="s-block-inner flex flex-col bg-brand-4 lg:ml-a">
        <Heading type="h2" class="font-medium">
          Join the Community
        </Heading>
        <div class="my-a py-8">
          <div class="networks grid grid-flow-dense gap-6 md:gap-12">
            <AppLink v-for="n in networks" :key="n.name" class="flex items-center hover:color-brand-3" :href="n.url">
              <div class="h-12 w-12 flex items-center justify-center border-1 b-brand-1 rounded-full">
                <div :class="n.icon" class="p-3" :title="n.name" aria-hidden="true" />
              </div>
              <div class="px-4">
                <Heading type="h4" class="font-500">
                  {{ n.name }}
                </Heading>
                <p class="p3 text-sm">
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
        <div />
      </div>
    </div>
  </div>
</template>

<style lang="postcss">
.networks {
  grid-template-columns: repeat(auto-fill, minmax(12rem, 1fr));
}
.s-block {
  @apply py-8 px-6 xl:p-12;
}
.s-block-inner {
  @apply rounded-3xl p-8 md:p-12;
  min-height: min(100vmin, 35rem);
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
