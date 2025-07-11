<script setup lang="ts">
import FreeStorage from '~/components/FreeStorage.vue'
import ReferralCodeCreator from '~/components/ReferralCodeCreator.vue'

// SEO metadata for referrals page
useSeoMeta({
  title: 'Referrals Program | Earn RACHA Points & Storage Credits - Storacha',
  description: 'Refer friends to Storacha and earn RACHA Points and Storage Credits! Get rewarded for sharing our blazing-fast, decentralized storage network.',
  ogTitle: 'Storacha Referrals - Earn RACHA Points & Storage Credits',
  ogDescription: 'Share Storacha with friends and earn up to 460 RACHA Points and Storage Credits through our referral program.',
  ogImage: '/img/referrals/referrals-og.jpg',
  keywords: 'storacha referrals, RACHA points, storage credits, refer friends, rewards program, loyalty program',
})

// Structured data for referrals page
useHead({
  script: [{
    type: 'application/ld+json',
    innerHTML: JSON.stringify({
      "@context": "https://schema.org",
      "@type": "WebPage",
      "name": "Storacha Referrals Program",
      "description": "Refer friends to Storacha and earn RACHA Points and Storage Credits through our rewards program.",
      "url": "https://storacha.network/referrals",
      "isPartOf": {
        "@type": "WebSite",
        "name": "Storacha Network",
        "url": "https://storacha.network"
      },
      "breadcrumb": {
        "@type": "BreadcrumbList",
        "itemListElement": [{
          "@type": "ListItem",
          "position": 1,
          "name": "Home",
          "item": "https://storacha.network"
        }, {
          "@type": "ListItem",
          "position": 2,
          "name": "Referrals",
          "item": "https://storacha.network/referrals"
        }]
      },
      "mainEntity": {
        "@type": "LoyaltyProgram",
        "name": "Storacha Referral Program",
        "description": "Earn RACHA Points and Storage Credits by referring friends to Storacha's decentralized storage network.",
        "provider": {
          "@type": "Organization",
          "name": "Storacha Network"
        }
      }
    })
  }]
})
</script>

<template>
  <TransitionProvider>
    <Section class="referrals-bg bg-brand-4">
      <HeroBase class="sm:min-h-200">
        <template #left>
          <SectionHeader
            class="color-brand-3" eyebrow="Earn Racha Points & Storage Credits"
            title="Refer your friends to Storacha!"
            description="Share Storacha's blazing-fast, decentralized storage and get rewarded with Racha Points, part of our soon to be announced Loyalty Program, and Storage Credits! It's simple: the more friends you refer, the more perks you unlock!"
          />
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
        <SplitCell :bg="{ outer: 'bg-brand-2', inner: 'rewards-bg' }" />
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
      <ReferralCodeCreator class="pt-8" />
    </Section>
  </TransitionProvider>
</template>

<style lang="postcss">
.rewards-bg {
  background: url(/img/referrals/rewards.png) no-repeat bottom right;
  background-size: contain;
}
@screen xl {
  .referrals-bg {
    background: url(/img/referrals/hero.png) no-repeat right;
    background-size: contain;
  }
}
</style>