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
    <Section
      class="overflow-hidden bg-brand-2"
    >
      <template #bg>
        <div class="pre-footer-bg" />
      </template>
      <PreFooter class="min-h-lg" heading="Hello" :cta="{ text: 'See Roadmap', href: '/' }" />
    </Section>
  </TransitionProvider>
</template>

<style lang="postcss" scoped>
.pre-footer-bg {
  background: url('/img/racha-footer.svg') no-repeat right bottom / cover;
}
</style>
