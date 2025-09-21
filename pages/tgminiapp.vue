<script setup lang="ts">

// SEO metadata for telegram backup page
useSeoMeta({
  title: 'Telegram Mini App | Secure Decentralized Storage - Storacha',
  description: 'Backup your Telegram chats to Storacha\'s decentralized storage. Safe, private, encrypted backups that you control forever.',
  ogTitle: 'Don\'t Lose Your Telegram Chats - Backup with Storacha',
  ogDescription: 'Secure your 1-on-1s, groups, and channels with encrypted backups on decentralized storage.',
  ogImage: '/img/tgminiapp/tgminiapp-og.png',
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
      'url': 'https://storacha.network/tgminiapp',
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
          <SectionHeader class="color-brand-3" eyebrow="BACKUP AND EARN LOYALTY POINTS"
            title="Don't Lose Your Telegram Chats"
            description="Backup with Storacha’s decentralized storage - safe, private, forever." />
          <div class="mt-6 color-brand-3 prose p1">
            <NuxtLink href="https://t.me/storacha_bot/backup?utm_source=website" class="btn no-underline">
              Store-2-earn
            </NuxtLink>
          </div>
        </template>
      </HeroBase>
    </Section>
    <Section class="social-proof-section bg-brand-2" padding>
  <div class="flex items-center justify-center gap-8 md:gap-12">
    <div class="flex items-center px-4 py-2 rounded-full border border-black">
      <span class="text-sm font-medium text-black">Trusted By</span>
    </div>
    
    <div class="flex items-center gap-6 md:gap-8">
      <img src="/img/tgminiapp/logos/filecoin.png" alt="Filecoin" class="h-8">
      <img src="/img/tgminiapp/logos/infura.png" alt="INFURA" class="h-8">
      <img src="/img/tgminiapp/logos/opensea.png" alt="OpenSea" class="h-8">
      <img src="/img/tgminiapp/logos/magic-eden.png" alt="MAGIC EDEN" class="h-8">
    </div>
  </div>
</Section>

    <!-- Earn Rewards Section -->
    <Section full-width>
      <Split>
        <SplitCell :bg="{ outer: 'bg-white', inner: 'rewards-bg' }" />
        <SplitCell :bg="{ outer: 'bg-white' }" padding>
          <div class="flex items-center color-brand-3">
            <div>
              <Heading type="h2" class="font-medium">
                Back Up And Earn Rewards </Heading>

              <div class="prose p1">
                <p>
                  Earn <span class="highlight">10,000</span> mini Rachas per GB!<br>
                  Secure your data and earn rewards together.
                </p>

                <NuxtLink href="https://t.me/storacha_bot/backup?utm_source=website" class="btn no-underline">
                  Start Backup Now
                </NuxtLink>
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
              <img src="/img/tgminiapp/cards/chat.png" alt="Step 1: Authorize OTP" class="max-h-24">
            </div>
            <p class="font-sans p2">
              Give permission so the miniapp can read your chats (we can't back them up otherwise).
            </p>
          </div>
        </Card>
        <Card title="Step 2: Create Storacha Account">
          <div class="flex flex-col gap-8">
            <div class="min-h-30 flex items-center justify-center">
              <img src="/img/tgminiapp/cards/racha-click.png" alt="Step 2: Create Storacha Account" class="max-h-24">
            </div>
            <p class="font-sans p2">
              It takes seconds. Your encryption key is generated on your device.
            </p>
          </div>
        </Card>
        <Card title="Step 3: Start Backup">
          <div class="flex flex-col gap-8">
            <div class="min-h-30 flex items-center justify-center">
              <img src="/img/tgminiapp/cards/folder.png" alt="Step 3: Start Backup" class="max-h-24">
            </div>
            <p class="font-sans p2">
              Start your backup in seconds: simple, private, and encrypted.
            </p>
          </div>
        </Card>
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
              <img src="/img/tgminiapp/cards/chat-lock.png" alt="Your Key, Your Data" class="max-h-24">
            </div>
            <p class="font-sans p3">
              Encryption happens on your device. We never see your messages.
            </p>
          </div>
        </Card>
        <Card title="Decentralized">
          <div class="flex flex-col gap-8">
            <div class="min-h-30 flex items-center justify-center">
              <img src="/img/tgminiapp/cards/decentralized-network.png" alt="Decentralized" class="max-h-24">
            </div>
            <p class="font-sans p3">
              No central point of failure. Your chats are always recoverable.
            </p>
          </div>
        </Card>
        <Card title="Earn Rewards">
          <div class="flex flex-col gap-8">
            <div class="min-h-30 flex items-center justify-center">
              <img src="/img/tgminiapp/cards/racha-coins.png" alt="Earn Rewards" class="max-h-24">
            </div>
            <p class="font-sans p3">
              Back up and stack loyalty points.
            </p>
          </div>
        </Card>
        <Card title="MiniApp Magic">
          <div class="flex flex-col gap-8">
            <div class="min-h-30 flex items-center justify-center">
              <img src="/img/tgminiapp/cards/tg-click.png" alt="MiniApp Magic" class="max-h-24">
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
  pointer-events: none;
}

.social-proof-section {
  border-bottom: 1px solid #e2e8f0;
}

.highlight {
  font-weight: bold;
  font-size: 1.2em;
}

/* Mobile responsiveness */
@screen sm {
  .telegram-hero-section::after {
    width: 450px;
    height: 450px;
    right: 10px;
    opacity: 0.8;
  }
}

@screen md {
  .telegram-hero-section::after {
    width: 550px;
    height: 550px;
    right: 2%;
  }
}

@screen lg {

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