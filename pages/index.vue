<script lang="ts" setup>
const { mailingList } = useAppConfig()
</script>

<template>
  <TransitionProvider>
    <Section class="bg-brand-2">
      <template #bg>
        <div class="relative inset-0 grid-margins h-200vh h-full w-full" loading="lazy">
          <img width="100%" class="absolute top-0" src="/public/img/hero/back.webp" alt="" loading="lazy">
          <div class="absolute left-0 top-0 h-full w-full from-transparent to-brand-2 bg-gradient-to-l" t-skip />
          <img width="40%" class="t-bob absolute left-30% top-[max(-10vw,-100px)]" src="/public/img/hero/racha.webp" alt="" loading="lazy">
          <img width="100%" class="absolute top-[min(640px,50vw)]" src="/public/img/hero/front.webp" alt="" loading="lazy">
          <img class="absolute bottom-0 hidden" src="/public/img/hero/transition.webp" alt="" loading="lazy">
        </div>
      </template>
      <HeroHome
        eyebrow="Introducing Storacha"
        title="Super h🔥t decentralized data at scale."
        description="Storacha’s open hot storage network scales IPFS and Filecoin"
        :actions="[{ label: 'SIGN UP FOR EARLY ACCESS', href: mailingList.url }]"
      />
      <Section full-width>
        <Split>
          <SplitCell />
          <SplitCell class="bg-white color-brand-3" padding>
            <SectionHeader
              title="Storacha is decentralized storage, but a hot new take."
              description="Storacha transforms web3.storage into a community-driven, decentralized hot storage network. Proven to handle petabytes of data with large enterprise support, Storacha effortlessly manages massive data flows."
            />
          </SplitCell>
        </Split>
      </Section>
    </Section>
    <Intro />
    <Section class="bg-brand-6 color-brand-3" padding>
      <USPs />
    </Section>
    <Section class="min-h-200 flex items-center justify-center bg-gray-2 uppercase">
      <p>Network Diagram</p>
    </Section>
    <Section class="bg-brand-3 color-brand-4" full-width padding>
      <KeyFeatures />
    </Section>
    <Pricing />
    <Section class="bg-white color-brand-1" padding>
      <Ecosystem />
    </Section>
    <Section full-width>
      <Community />
    </Section>
    <PreFooter
      class="bg-brand-2"
      heading="Where will Storacha go next?"
      :cta="{ text: 'See Roadmap', href: '/roadmap' }"
    />
  </TransitionProvider>
</template>

<style lang="postcss" scoped>
@keyframes bob {
  0% {
    transform: translateY(-5px);
  }

  50% {
    transform:  translateY(10px);
  }
  100% {
    transform: translateY(-5px);
  }
}

.t-bob {
  animation: 5s ease-in-out 5s infinite both bob;
}
</style>
