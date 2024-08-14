<script lang="ts" setup>
const { mailingList } = useAppConfig()
</script>

<template>
  <TransitionProvider>
    <Section class="overflow-hidden bg-brand-2">
      <template #bg>
        <div class="grid-margins flex flex-col items-center justify-center transition-all !h-100vh lg:scale-90 md:scale-70 xl:scale-110">
          <div class="animate-slide-enter relative hidden h-[min(920px,100vh)] w-1240px md:block">
            <img class="absolute inset-0" src="/public/img/hero/back.webp" alt="" loading="lazy">
            <div class="absolute inset-0 from-transparent to-brand-2 bg-gradient-to-l" t-skip />
            <img width="35%" class="t-bob absolute left-33% top--5%" src="/public/img/hero/racha.webp" alt="" loading="lazy">
            <img class="absolute inset-0 top-520px w-full" src="/public/img/hero/front.webp" alt="" loading="lazy">
          </div>
        </div>
      </template>
      <HeroHome
        eyebrow="Introducing Storacha"
        title="Super h🔥t decentralized data at scale."
        description="Storacha’s open hot storage network scales IPFS and Filecoin"
        :actions="[{ label: 'SIGN UP FOR EARLY ACCESS', href: mailingList.url }]"
      />
      <Split>
        <SplitCell>
          <img class="absolute bottom--200px left-0 hidden md:block" width="500px" src="/public/img/hero/transition.webp" alt="" loading="lazy">
        </SplitCell>
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
    transform: translateY(0px);
  }

  50% {
    transform:  translateY(10px);
  }
  100% {
    transform: translateY(0px);
  }
}

.t-setup .t-bob {
  animation: slide-enter 2s both 1, 5s ease-in-out 3s infinite both bob;
}
</style>
