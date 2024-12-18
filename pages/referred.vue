<script setup lang="ts">
const route = useRoute()
const config = useRuntimeConfig()
const refcode = route.query.refcode
const consoleSignupUrl = `${config.public.consoleUrl}?refcode=${refcode}`
</script>

<template>
  <TransitionProvider>
    <Section class="bg-brand-4 referrals-bg">
      <HeroBase class="sm:min-h-200">
        <template #left>
          <div>
            <SectionHeader class="color-brand-3" eyebrow="A Master Racha Invited You"
              title="Receive up to Two Months of Free Storage"
              description="Sign up now for a Lite/Medium plan and receive two months subscription free. Sign up to a Business/Extra Spicy plan and receive one month subscription for free. Continue using Storacha to earn more rewards!" />
            <div class="color-brand-3 prose">
              <p>
                For the full rundown on how it all works, check out our <b><a href="https://docs.storacha.network/referral-terms/" class="whitespace-nowrap">Terms &
                    Conditions</a></b>.
              </p>
            </div>
            <a :href="consoleSignupUrl" class="btn">Claim Your Discount</a>
          </div>
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
                  It's the ultimate scaling solution for IPFS, adding the perfect kick to storage and retrieval, built
                  on
                  top of Filecoin. Plus, it guarantees verifiable, user-owned data. Whether you're scaling decentralised
                  applications
                  or infrastructure, Storacha delivers unmatched performance and reliability - season to taste.
                </p>
              </div>
            </div>
          </div>
        </SplitCell>
      </Split>
    </Section>
    <Section class="bg-brand-6 color-brand-3" full-width>
      <ReferralPricing />
    </Section>
  </TransitionProvider>
</template>

<style lang="postcss" scoped>
@screen xl {
  .referrals-bg {
    background: url(/img/referrals/hero.png) no-repeat right;
    background-size: contain;
  }
}
</style>
