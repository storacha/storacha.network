<script setup lang="ts">
import ReferredButton from '~/components/ReferredButton.vue';
</script>

<template>
  <TransitionProvider>
    <Section class="bg-brand-4 mt-16">
      <HeroBase>
        <template #right>
          <SectionHeader class="min-h-150 color-brand-3" eyebrow="A Master Racha Invited You"
            title="Receive up to Two Months of Free Storage"
            description="Sign up now for a Lite plan and receive two months subscription free. Sign up to a Business plan and receive one month subscription for free. Continue using Storacha so both of you earn even more!"
            :actions="[{asComponent: ReferredButton}]" />
        </template>
      </HeroBase>
    </Section>
    <Section full-width>
      <Split>
        <SplitCell :bg="{ outer: 'bg-brand-2' }" />
        <SplitCell :bg="{ outer: 'bg-white' }" padding>
          <div class="flex items-center color-brand-3">
            <div>
              <Heading type="h2" class="font-medium">
                About Storacha
              </Heading>
              <div class="prose p1">
                <p>
                  Storacha transforms web3.storage into a community-driven, decentralized hot storage network. Proven
                  to handle petabytes of data with large enterprise support, Storacha effortlessly manages massive
                  data flows.
                </p>
                <p>
                  It's the ultimate scaling solution for IPFS, adding the perfect kick to storage and retrieval, built on
                  top of Filecoin. Plus, it guarantees verifiable, user-owned data. Whether you're scaling decentralised applications
                  or infrastructure, Storacha delivers unmatched performance and reliability - season to taste.
                </p>
              </div>
            </div>
          </div>
        </SplitCell>
      </Split>
    </Section>
  </TransitionProvider>
</template>
