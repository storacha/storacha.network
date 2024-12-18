<script setup lang="ts">
import FreeStorage from '~/components/FreeStorage.vue';
import ReferralCodeCreator from '~/components/ReferralCodeCreator.vue';
</script>

<template>
  <TransitionProvider>
    <Section class="bg-brand-4 referrals-bg">
      <HeroBase class="sm:min-h-200">
        <template #left>
          <SectionHeader class="color-brand-3" eyebrow="Earn Racha Points & Storage Credits"
            title="Refer your friends to Storacha!"
            description="Share Storacha’s blazing-fast, decentralized storage and get rewarded with Racha Points, part of our soon to be announced Loyalty Program, and Storage Credits! It’s simple: the more friends you refer, the more perks you unlock!" />
          <div class="color-brand-3 prose p1">
            <p>
              <b>Enter your email</b> and we will generate your unique referral code!
            </p>
            <ReferralCodeCreator />
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
                Earn Rewards!
              </Heading>
              <div class="prose p1">
                <p>
                  What you can get from referring:
                </p>
                <ul>
                  <li><b>20 Racha Points</b> and <b>20 Storage Credits</b> for each successful Lite/Medium referral.</li>
                  <li><b>100 Racha Points</b> and <b>100 Storage Credits</b> for each successful Business/Extra Spicy referral.</li>
                </ul>
                <p>
                  In total, you can earn up to <b>460 Racha Points and Storage Credits</b>. For the full rundown on how it all works, check
                  out our <b><a href="https://docs.storacha.network/referral-terms/">Terms & Conditions</a>.</b>
                </p>
              </div>
            </div>
          </div>
        </SplitCell>
      </Split>
    </Section>
    <FreeStorage />
    <Section class="bg-brand-6 color-brand-3" padding>
      <ReferralProcess />
      <ReferralCodeCreator class="pt-8"/>
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
