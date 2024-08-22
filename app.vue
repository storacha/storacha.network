<script setup lang="ts">
defineOgImage({ url: '/img/storacha-og-card.png', width: 1200, height: 630, alt: 'Storacha - Decentralized Hot Storage Layer on Filecoin' })
</script>

<template>
  <NuxtLoadingIndicator color="#BDE0FF" style="opacity: 1;" />
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
  <DevOnly>
    <Debug />
  </DevOnly>
</template>

<style lang="postcss">
html {
  @apply antialiased bg-brand-4;
  /*
  TODO: temp fix to resolve scroll offset issues to be fixed in nuxt v3.13.0
  https://github.com/nuxt/nuxt/pull/28320
  */
  scroll-padding-top: 80px;
}

p a {
  @apply transform decoration-1 decoration-gray/50 underline underline-offset-3;
}

p a:hover {
  @apply decoration-gray decoration-2;
}
footer a:hover {
  @apply underline;
}
</style>
