<script lang="ts" setup>

</script>

<template>
  <SectionHeader
    eyebrow="Get Involved"
    title="Storacha is open sauce, it needs you. 🌶️"
    description="Stay in touch and be one of the first to add some serious heat to your network with our blazing fast, decentralized storage and retrieval solutions!"
    :actions="[{ label: 'BECOME A NODE PROVIDER', href: '/', primary: true }, { label: 'SIGN UP FOR OUR NEWSLETTER', href: '/', outline: true }]"
  />
  <Section class="ecosystem mt-12" full-width>
    <Heading type="h4" class="text-center">
      THE STORACHA ECOSYSTEM
    </Heading>
    <div class="grid grid-cols-1 mt-12 w-full gap-4 md:grid-cols-3">
      <div
        v-for="i in 3" :key="i"
        class="aspect-ratio-video flex items-center justify-center rounded-2xl bg-gray-2 text-gray-6"
      >
        {{ i }}
      </div>
    </div>
  </Section>
</template>

<style>

</style>
