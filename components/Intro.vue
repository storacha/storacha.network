<script lang="ts" setup>
const start = useActions('start')
const docs = useActions('docs')
</script>

<template>
  <Section class="bg-brand-6 color-brand-3" padding>
    <template #bg>
      <div class="grid-margins hidden items-center justify-right opacity-50 transition-all md:flex lg:opacity-100">
        <img width="250" src="/img/intro-spot.svg" alt="Storacha Folder">
      </div>
    </template>
    <SectionHeader
      eyebrow="Get Started"
      title="Why settle for mild when you can make it spicy with Storacha?"
      :actions="[
        start,
        { ...docs, text: 'Learn More', secondary: true }]"
    />
  </Section>
</template>

<style>

</style>
