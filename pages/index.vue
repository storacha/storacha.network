<script lang="ts" setup>
const { mailingList, socialNetworks } = useAppConfig()
</script>

<template>
  <TransitionProvider>
    <Section class="bg-brand-4">
      <Hero
        headline="Super h🔥t decentralized data at scale."
        description="COMING SOON 2024"
        :action="{ text: 'SIGN UP FOR EARLY ACCESS', href: mailingList.url }"
      />
    </Section>
    <Section class="min-h-200 flex items-center justify-center bg-brand-6">
      <p>Hero</p>
    </Section>
    <Intro />
    <Section class="min-h-100 flex items-center justify-center bg-brand-6">
      <p>USPs</p>
    </Section>
    <Section class="min-h-200 flex items-center justify-center">
      <p>Network Diagram</p>
    </Section>
    <Section class="min-h-200 flex items-center justify-center bg-brand-3">
      <p>Key Features</p>
    </Section>
    <Section class="bg-brand-4" full-width padding>
      <Roadmap />
    </Section>
    <Section full-width>
      <Community :networks="socialNetworks" />
    </Section>
    <Pricing />
    <Section class="min-h-200 flex items-center justify-center bg-brand-2">
      <p>Ecosystem</p>
    </Section>
    <PreFooter
      class="bg-brand-2"
      heading="Where will Storacha go next?"
      :cta="{ text: 'See Roadmap', href: '/' }"
    />
  </TransitionProvider>
</template>

<style lang="postcss" scoped>

</style>
