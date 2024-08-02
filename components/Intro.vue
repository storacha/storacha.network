<script lang="ts" setup>

</script>

<template>
  <Section class="bg-brand-6 color-brand-3" padding>
    <template #bg>
      <div class="grid-margins hidden items-center justify-right opacity-50 transition-all md:flex lg:opacity-100">
        <img width="250px" src="/public/img/spot-hero.webp" alt="Storacha Folder">
      </div>
    </template>
    <SectionHeader
      eyebrow="Get Started"
      title="Why settle for mild when you can make it spicy with Storacha?"
      :actions="[
        { label: 'START STORING', href: '/' },
        { label: 'BECOME A NODE PROVIDER', href: '/', outline: true },
      ]"
    />
  </Section>
  <Section class="bg-brand-6 color-brand-3" padding>
    <p>USPs</p>
  </Section>
</template>

<style>

</style>
