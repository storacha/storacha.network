<script setup lang="ts">
import FreeStorage from '~/components/FreeStorage.vue';
import ReferralCodeCreator from '~/components/ReferralCodeCreator.vue';
</script>

<template>
  <TransitionProvider>
    <Section class="bg-brand-4 mt-16">
      <HeroBase>
        <template #right>
          <SectionHeader class="color-brand-3" eyebrow="Earn Storage Credits and Racha Points"
            title="Welcome to Storacha's Referral Program"
            description="Ready to help others experience blazing-fast, decentralized storage? Here's your chance to spread the Storacha love while earning free storage for yourself!" />
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
                Who Can Join?
              </Heading>
              <div class="prose p1">
                <p>
                  Anyone can refer friends to Storacha! you don't have to be a user to share Storacha's spicy storage.
                  To
                  redeem your rewards, though, you'll need to sign up.
                </p>
                <p>
                  Here are some quick details:
                </p>
                <ul>
                  <li>You can refer up to <b>11 friends</b>.</li>
                  <li>You can earn up to <b>8 months free Lite storage</b> or <b>3 months free Business storage</b>.
                  </li>
                </ul>
                <p>
                  For the full rundown on how it all works, check out our <b><a href="#TODOneedurl">Terms &
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
