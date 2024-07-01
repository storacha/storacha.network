<script setup lang="ts">

</script>

<template>
  <TransitionProvider>
    <Section class="home-bg min-h-100vh bg-brand-4 2xl:min-h-200 md:min-h-100vh">
      <Hero
        headline="The h🔥ttest storage network on the planet."
        description="COMING SOON 2024"
        :action="{ text: 'SIGN UP FOR EARLY ACCESS', href: $config.public.mailingListUrl }"
      />
    </Section>
    <Section class="min-h-100vh 2xl:min-h-200 md:min-h-100vh" full-width>
      <div class="grid grid-cols-1 gap-0 md:grid-cols-2">
        <div class="bg-brand-2 p-15%">
          <div class="sm:float-right">
            <img src="/img/storacha-neon.svg" alt="Storacha Network ">
          </div>
        </div>
        <div class="max-w-3xl p-10% sm:float-left">
          <h2 class="color-brand-3 font-500 h1">
            Storacha is decentralized storage, but a hot new take.
          </h2>
          <div class="grid grid-cols-1 my-12 gap-12 color-brand-3 md:grid-cols-2 p1">
            <p>Storacha transforms web3.storage into a community-driven, decentralized hot storage network. Proven to handle petabytes of data with large enterprise support, Storacha effortlessly manages massive data flows. It's the ultimate scaling solution for IPFS,</p>
            <p>adding the perfect kick to storage and retrieval with incentives from Filecoin Storage Providers (SPs). Plus, it guarantees verifiable, user-owned data. Whether you’re scaling decentralized applications or infrastructure, Storacha delivers unmatched performance and reliability, seasoned to taste.</p>
          </div>
        </div>
      </div>
    </Section>
  </TransitionProvider>
</template>
