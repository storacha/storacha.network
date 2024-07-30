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
    <Section full-width>
      <MissionBlock />
    </Section>
    <Section class="bg-brand-4" full-width padding>
      <Roadmap />
    </Section>
    <Section full-width>
      <Community :networks="socialNetworks" />
    </Section>
    <Pricing />
    <PreFooter
      class="bg-brand-2"
      heading="Where will Storacha go next?"
      :cta="{ text: 'See Roadmap', href: '/' }"
    />
  </TransitionProvider>
</template>

<style lang="postcss" scoped>

</style>
