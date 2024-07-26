<script lang="ts" setup>
const { footerLinks: { getStarted, resources } } = useAppConfig()
</script>

<template>
  <footer class="bg-brand-4 py-8 color-brand-3">
    <div class="grid-margins border-2 b-brand-3 rounded-2xl py-12">
      <div class="grid cols-1 gap-6 text-xs lg:cols-3 sm:cols-2 sm:text-base">
        <div>
          <MailingListSignup />
        </div>
        <div class="flex text-center lg:justify-center">
          <SocialNetworks class="h-12 items-center" icon-class="hover:color-brand-1 hover:scale-110" />
        </div>
        <div>
          <div class="grid cols-1 gap-8 lg:cols-2">
            <div>
              <Heading class="mb font-500" type="h5">
                Resources
              </Heading>
              <ul>
                <li v-for="link in resources" :key="link.url">
                  <AppLink :href="link.url">
                    {{ link.text }}
                  </AppLink>
                </li>
              </ul>
            </div>
            <div>
              <Heading class="mb font-500" type="h5">
                Getting Started
              </Heading>
              <ul>
                <li v-for="link in getStarted" :key="link.url">
                  <AppLink :href="link.url">
                    {{ link.text }}
                  </AppLink>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      <div class="mt-24 color-brand-3">
        <img src="/img/storacha-wm.svg" alt="Storacha" aria-hidden="true" class="mx-auto w-full" loading="lazy">
      </div>
    </div>
  </footer>
</template>

<style>

</style>
