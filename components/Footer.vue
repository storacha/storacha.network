<script lang="ts" setup>
// This script is correct and fetches the necessary data.
const { mailingList, footerLinks } = useAppConfig().actions
const { getStarted, resources } = footerLinks
</script>

<template>
  <footer class="bg-brand-4 color-brand-3">
    <div class="border-3 b-current rounded-10 px-6 py-5 md:rounded-20 md:pt-12">
      <div class="grid cols-1 gap-6 text-xs lg:cols-3 sm:cols-2 sm:text-base">
        <div class="header flex justify-center sm:justify-start">
          <Btn 
            :href="mailingList.href" 
            target="_blank" 
            rel="noopener"
            :icon="mailingList.icon"
            :text="mailingList.text"
            class="min-w-0 max-w-full"
          />
        </div>
        <div class="header flex text-1.2em lg:justify-center">
          <SocialNetworks
            class="items-center"
            icon-class="text-2xl text-brand-3 transition hover:scale-110 hover:text-brand-1"
          />
        </div>
        <div>
          <div class="grid cols-1 gap-6 lg:cols-2">
            <div>
              <div class="header align-middle">
                <Heading class="font-medium" type="h5">
                  Resources
                </Heading>
              </div>
              <ul>
                <li v-for="link in resources" :key="link.href">
                  <AppLink :href="link.href">
                    {{ link.text }}
                  </AppLink>
                </li>
              </ul>
            </div>
            <div>
              <div class="header">
                <Heading class="font-medium" type="h5">
                  Getting Started
                </Heading>
              </div>
              <ul>
                <li v-for="link in getStarted" :key="link.href">
                  <AppLink :href="link.href">
                    {{ link.text }}
                  </AppLink>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      <div class="mb-2 mt-8 sm:mt-16 w-full overflow-hidden">
        <img src="/img/storacha-wm.svg" alt="Storacha" aria-hidden="true" class="mx-auto max-w-full h-auto block" loading="lazy">
      </div>
    </div>
  </footer>
</template>

<style lang="postcss" scoped>
@screen md {
  .header {
    @apply h-13 flex items-center;
    h5 {
      @apply text-nowrap;
    }
  }
}
</style>