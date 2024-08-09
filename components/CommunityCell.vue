<script lang="ts" setup>
interface SocialNetwork {
  name: string
  description: string
  url: string
  icon: string
}
const appConfig = useAppConfig()
const networks = appConfig.socialNetworks as SocialNetwork[]
</script>

<template>
  <div class="w-full flex flex-col">
    <Heading type="h3" class="font-medium">
      Join the Community
    </Heading>
    <div class="my-a pt-8">
      <div class="networks grid grid-flow-dense gap-6 md:gap-12">
        <AppLink v-for="n in networks" :key="n.name" class="flex items-center transition-all hover:(scale-102 color-brand-1)" :href="n.url">
          <div class="h-12 w-12 flex items-center justify-center border-1 b-current rounded-full">
            <div :class="n.icon" class="p-3" :aria-label="`${n.description} on ${n.name}`" />
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
</template>

<style lang="postcss" scoped>
.networks {
  grid-template-columns: repeat(auto-fill, minmax(12rem, 1fr));
}
</style>
