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
