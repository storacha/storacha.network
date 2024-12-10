<script setup lang="ts">
import FreeStorage from '~/components/FreeStorage.vue';
import ReferralCodeCreator from '~/components/ReferralCodeCreator.vue';
</script>

<template>
  <TransitionProvider>
    <Section class="bg-brand-4 mt-16">
      <HeroBase>
        <template #right>
          <SectionHeader class="color-brand-3" eyebrow="Earn Racha Points & Storage Credits"
            title="Refer your friends to Storacha!"
            description="Share Storacha’s blazing-fast, decentralized storage and get rewarded with Racha Points and free subscription upgrades! It’s simple: the more friends you refer, the more perks you unlock!" />
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
                Rewards For You and Your Rachas!
              </Heading>
              <div class="prose p1">
                <p>
                  You can earn <b>Racha Points</b> and up to <b>460 Storage Credits</b> from successful referrals to Storacha.
                </p>
                <p>
                  Here are some quick details:
                </p>
                <ul>
                  <li><b>Racha Points</b> are part of our soon to be announced Loyalty Program.</li>
                  <li>For every <b>successful Lite/Medium referral</b>, you'll earn 20 Storage Credits. Limit of 8 successful referrals for this tier.</li>
                  <li>For every <b>successful Business/Extra Spicy referral</b>, you'll earn 100 Storage Credits. Limit of 3 successful referrals for this tier.
                  </li>
                </ul>
                <p>
                  For the full rundown on how it all works, check out our <b><a href="https://docs.storacha.network/referral-terms/">Terms &
                      Conditions</a>.</b>
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
