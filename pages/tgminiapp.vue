<script setup lang="ts">
import FreeStorage from '~/components/FreeStorage.vue'
const docs = useActions('docs')


// SEO metadata for telegram backup page
useSeoMeta({
  title: 'Telegram Mini App | Secure Decentralized Storage - Storacha',
  description: 'Backup your Telegram chats to Storacha\'s decentralized storage. Safe, private, encrypted backups that you control forever.',
  ogTitle: 'Don\'t Lose Your Telegram Chats - Backup with Storacha',
  ogDescription: 'Secure your 1-on-1s, groups, and channels with encrypted backups on decentralized storage.',
  ogImage: '/img/tgminiapp/telegram-backup-og.jpg',
  keywords: 'telegram backup, chat backup, decentralized storage, encrypted backup, secure messaging',
})

// Structured data for telegram backup page
useHead({
  script: [{
    type: 'application/ld+json',
    innerHTML: JSON.stringify({
      '@context': 'https://schema.org',
      '@type': 'WebPage',
      'name': 'Telegram Chat Backup',
      'description': 'Backup your Telegram chats to Storacha\'s secure decentralized storage network.',
      'url': 'https://storacha.network/telegram-backup',
      'isPartOf': {
        '@type': 'WebSite',
        'name': 'Storacha Network',
        'url': 'https://storacha.network',
      },
      'mainEntity': {
        '@type': 'SoftwareApplication',
        'name': 'Storacha Telegram Backup',
        'description': 'Secure, encrypted backup solution for Telegram chats using decentralized storage.',
        'provider': {
          '@type': 'Organization',
          'name': 'Storacha Network',
        },
      },
    }),
  }],
})

</script>

<template>
  <TransitionProvider>
    <!-- Hero Section -->
    <Section class="telegram-hero-section">
      <HeroBase class="sm:min-h-200">
        <template #left>
          <SectionHeader class="hero-content color-brand-3" eyebrow="BACKUP AND EARN LOYALTY POINTS"
            title="Don't Lose Your Telegram Chats"
            description="Backup your 1-on-1s, groups, and channels to Storacha's decentralized storage - safe, private, secure." />
          <div class="mt-6 color-brand-3 prose p1">
            <NuxtLink href="https://t.me/storacha_bot/backup?utm_source=website" class="btn no-underline">
              Start Backup Now
            </NuxtLink>
          </div>
        </template>
      </HeroBase>
    </Section>

    <!-- Earn Rewards Section -->
    <Section full-width>
      <Split>
        <SplitCell :bg="{ outer: 'bg-brand-2', inner: 'rewards-bg' }" />
        <SplitCell :bg="{ outer: 'bg-white' }" padding>
          <div class="flex items-center color-brand-3">
            <div>
              <Heading type="h2" class="font-medium">
                🔥 Back Up & Rack Up
              </Heading>
              <div class="prose p1">
                <p>
                  Every time you back up your Telegram chats, you're not just securing your data, you're also stacking
                  rewards.
                </p>
                <div class="callout-box my-4">
                  <div class="text-2xl font-bold">
                    <b>💎 Earn 10,000 mini Rachas per GB backed up</b>
                  </div>
                </div>
                <p>
                  More perks are coming soon! Stay tuned for fresh ways to use your rewards.
                </p>
              </div>
            </div>
          </div>
        </SplitCell>
      </Split>
    </Section>

    <!-- How to Get Started Section -->
    <Section class="bg-brand-4" padding>
      <div class="color-brand-3">
        <SectionHeader title="How to Get Started" center />
      </div>
      <div class="grid grid-cols-1 mt-12 gap-4 sm:grid-cols-3">
        <Card title="Step 1: Authorize OTP">
          <div class="flex flex-col gap-8">
            <div class="min-h-30 flex items-center justify-center">
              <img src="/img/nodes/storage.png" alt="Step 1: Authorize OTP" class="max-h-24">
            </div>
            <p class="font-sans p2">
              Give permission so the miniapp can read your chats (we can't back them up otherwise).
            </p>
          </div>
        </Card>
        <Card title="Step 2: Create Storacha Account">
          <div class="flex flex-col gap-8">
            <div class="min-h-30 flex items-center justify-center">
              <img src="/img/nodes/retrieval.png" alt="Step 2: Create Storacha Account" class="max-h-24">
            </div>
            <p class="font-sans p2">
              It takes seconds. Your encryption key is generated on your device.
            </p>
          </div>
        </Card>
        <Card title="Step 3: Start Backup">
          <div class="flex flex-col gap-8">
            <div class="min-h-30 flex items-center justify-center">
              <img src="/img/nodes/indexing.png" alt="Step 3: Start Backup" class="max-h-24">
            </div>
            <p class="font-sans p2">
              Start your backup in seconds: simple, private, and encrypted.
            </p>
          </div>
        </Card>
      </div>



      <div class="mt-6 text-center">
        <NuxtLink href="https://docs.storacha.network/" class="btn  no-underline"
          :class="{ 'btn-secondary': docs.secondary }">
          Learn More
        </NuxtLink>
      </div>
    </Section>

    <!-- Security & Benefits Section -->
    <Section class="bg-brand-4" padding>
      <div class="color-brand-3">
        <SectionHeader title="Security & Benefits" center />
      </div>
      <div class="grid grid-cols-1 mt-12 gap-4 lg:grid-cols-4 md:grid-cols-2">
        <Card title="Your Key, Your Data">
          <div class="flex flex-col gap-8">
            <div class="min-h-30 flex items-center justify-center">
              <img src="/img/nodes/storage.png" alt="Your Key, Your Data" class="max-h-24">
            </div>
            <p class="font-sans p3">
              Encryption happens on your device. We never see your messages.
            </p>
          </div>
        </Card>
        <Card title="Decentralized">
          <div class="flex flex-col gap-8">
            <div class="min-h-30 flex items-center justify-center">
              <img src="/img/nodes/retrieval.png" alt="Decentralized" class="max-h-24">
            </div>
            <p class="font-sans p3">
              No central point of failure. Your chats are always recoverable.
            </p>
          </div>
        </Card>
        <Card title="Earn Rewards">
          <div class="flex flex-col gap-8">
            <div class="min-h-30 flex items-center justify-center">
              <img src="/img/nodes/indexing.png" alt="Earn Rewards" class="max-h-24">
            </div>
            <p class="font-sans p3">
              Back up and stack loyalty points you can redeem later.
            </p>
          </div>
        </Card>
        <Card title="MiniApp Magic">
          <div class="flex flex-col gap-8">
            <div class="min-h-30 flex items-center justify-center">
              <img src="/img/nodes/storage.png" alt="MiniApp Magic" class="max-h-24">
            </div>
            <p class="font-sans p3">
              Open inside Telegram via bot. No downloads, no hassle.
            </p>
          </div>
        </Card>
      </div>
    </Section>

    <!-- Final CTA Section -->
    <Section class="text-center color-brand-3" style="background: #EFE4F3;" padding>
      <Heading type="h2" class="mb-4 font-medium font-bold">
        Don't wait until it's too late.
      </Heading>
      <div class="mx-auto max-w-xl">
        <p class="mb-6 text-lg prose p1">
          Protect your Telegram chats today with Storacha.
        </p>
      </div>
      <NuxtLink href="https://t.me/storacha_bot/backup?utm_source=website" class="btn no-underline">
        Start Backup Now
      </NuxtLink>
    </Section>
  </TransitionProvider>
</template>

<style lang="postcss">
.rewards-bg {
  background: url(/img/tgminiapp/rewards.png) no-repeat bottom right;
  background-size: contain;
}

.telegram-hero-section {
  position: relative;
  min-height: 100vh;
  background: #BDE0FF;
  overflow: hidden;
  padding-bottom: 0;
  margin-bottom: 0;
}

.telegram-hero-section::after {
  content: '';
  position: absolute;
  top: 50%;
  right: 3%;
  transform: translateY(-50%);
  width: 600px;
  height: 600px;
  background: url(/img/tgminiapp/hero.png) no-repeat center center;
  background-size: contain;
  z-index: 1;
  pointer-events: none;
}

.hero-content {
  position: relative;
  z-index: 2;
}

.callout-box {
  border-left: 4px solid var(--brand-1);
}

/* Mobile responsiveness */
@screen sm {
  .telegram-hero-section {
    min-height: 100vh;
  }

  .telegram-hero-section::after {
    width: 450px;
    height: 450px;
    right: 10px;
    opacity: 0.8;
  }
}

@screen md {
  .telegram-hero-section {
    min-height: 100vh;
  }

  .telegram-hero-section::after {
    width: 550px;
    height: 550px;
    right: 2%;
  }
}

@screen lg {
  .telegram-hero-section {
    min-height: 100vh;
  }

  .telegram-hero-section::after {
    width: 650px;
    height: 650px;
    right: 3%;
  }
}

@screen xl {
  .telegram-hero-section::after {
    width: 750px;
    height: 750px;
    right: 5%;
  }
}
</style>