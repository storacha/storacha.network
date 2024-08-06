<script lang="ts" setup>
const { mailingList, socialNetworks } = useAppConfig()
</script>

<template>
  <TransitionProvider>
    <Section class="bg-brand-2">
      <HeroHome
        eyebrow="Introducing Storacha"
        title="Super h🔥t decentralized data at scale."
        description="Storacha’s open hot storage network scales IPFS and Filecoin"
        :actions="[{ label: 'SIGN UP FOR EARLY ACCESS', href: mailingList.url }]"
      />
    </Section>
    <Intro />
    <Section class="bg-brand-6 color-brand-3" padding>
      <USPs />
    </Section>
    <Section class="min-h-200 flex items-center justify-center bg-gray-2 uppercase">
      <p>Network Diagram</p>
    </Section>
    <Section class="min-h-200 flex items-center justify-center bg-brand-3 color-white uppercase">
      <p>Key Features</p>
    </Section>
    <Section full-width>
      <Community :networks="socialNetworks" />
    </Section>
    <Pricing />
    <Section class="min-h-200 flex items-center justify-center bg-brand-2 uppercase">
      <p>Ecosystem</p>
    </Section>
    <PreFooter
      class="bg-brand-2"
      heading="Where will Storacha go next?"
      :cta="{ text: 'See Roadmap', href: '/roadmap' }"
    />
  </TransitionProvider>
</template>

<style lang="postcss" scoped>

</style>
