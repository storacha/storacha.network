<script lang="ts" setup>
const start = useActions('start')
</script>

<template>
  <TransitionProvider>
    <Section class="overflow-hidden bg-brand-2">
      <template #bg>
        <div class="grid-margins flex flex-col items-center justify-center transition-all !h-100vh lg:scale-90 md:scale-70 xl:scale-100">
          <div class="animate-slide-enter relative hidden h-[min(1024px,100vh)] w-screen-xl md:block">
            <img
              class="absolute inset-0" src="/img/hero/back.webp"
              srcset="/img/hero/back.webp, /img/hero/back@2x.webp 2x"
              alt="" loading="eager"
              height="1108"
              width="1551"
            >
            <div class="absolute inset-0 w-full h-screen-lg from-transparent to-brand-2 bg-gradient-to-tl" t-skip />
            <img
              class="t-bob absolute left-26% top--640px" src="/img/hero/racha.svg" alt="" loading="eager"
              width="495"
            >
            <img
              class="absolute inset-0 left--42px top-608px" src="/img/hero/front.webp"
              srcset="/img/hero/front.webp, /img/hero/front@2x.webp 2x"
              alt="" loading="eager"
              height="1406"
              width="1612"
            >
          </div>
        </div>
      </template>
      <HeroHome
        eyebrow="Introducing Storacha"
        title="Super h🔥t decentralized data at scale."
        description="Storacha’s open hot storage network scales IPFS and Filecoin"
        :actions="[start]"
      />
      <Split>
        <SplitCell />
        <SplitCell class="mx--6 bg-white color-brand-3" padding>
          <SectionHeader
            title="Storacha is decentralized storage, but a hot new take."
          />
          <div class="max-w-50ch prose p1">
            <p>
              Storacha transforms web3.storage into a community-driven, decentralized hot storage network. Proven to handle petabytes of data with large enterprise support, Storacha effortlessly manages massive data flows.
            </p>
            <p>
              It's the ultimate scaling solution for IPFS, adding the perfect kick to storage and retrieval with incentives from Filecoin Storage Providers (SPs). Plus, it guarantees verifiable, user-owned data. Whether you’re scaling decentralized applications or infrastructure, Storacha delivers unmatched performance and reliability — season to taste.
            </p>
          </div>
        </SplitCell>
      </Split>
    </Section>
    <Intro />
    <Section class="bg-brand-6 color-brand-3">
      <USPs />
    </Section>
    <Section class="bg-brand-6" padding>
      <YouTubePlayer
        video-id="12pqEPC3Ai8"
        :player-vars="{ loop: 1, playlist: '12pqEPC3Ai8' }"
        :placeholder-attrs="{
          src: '/img/video/storacha-network-illustration.webp',
          class: 'bg-brand-6',
          style: { objectFit: 'cover' } }"
        :width="1232"
        :height="693"
      />
    </Section>
    <Section class="bg-brand-3 color-brand-4" full-width padding>
      <KeyFeatures />
    </Section>
    <Pricing />
    <Section id="ecosystem" class="bg-white color-brand-1" padding>
      <Ecosystem />
    </Section>
    <Section full-width class="text-brand-3">
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
    transform: translateY(0px);
  }
  50% {
    transform: translateY(10px);
  }
  100% {
    transform: translateY(0px);
  }
}

.t-setup .t-bob {
  animation: 5s ease-in-out 3s infinite both bob;
}
</style>
