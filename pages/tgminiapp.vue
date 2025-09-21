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
    <Section class="telegram-hero-bg bg-brand-2">
      <HeroBase class="min-h-150 lg:min-h-180">
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
  <div class="flex items-center justify-between px-6 md:px-12 lg:px-15">
    <div class="flex items-center px-3 py-2 md:px-4 rounded-full border border-black">
      <span class="text-xs md:text-sm font-medium text-black">Trusted By</span>
    </div>
    
    <img src="/img/tgminiapp/logos/filecoin.png" alt="Filecoin" class="h-6 md:h-8">
    <img src="/img/tgminiapp/logos/infura.png" alt="INFURA" class="h-6 md:h-8">
    <img src="/img/tgminiapp/logos/opensea.png" alt="OpenSea" class="h-6 md:h-8">
    <img src="/img/tgminiapp/logos/magic-eden.png" alt="MAGIC EDEN" class="h-6 md:h-8">
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

.social-proof-section {
  border-bottom: 1px solid #e2e8f0;
}

.highlight {
  font-weight: bold;
  font-size: 1.2em;
}

@screen md {
  .telegram-hero-bg {
    background-image: url(/img/tgminiapp/hero.png);
    background-repeat: no-repeat;
    background-position: bottom right ;
    background-size: auto 55%;
  }
}

@screen lg {
  .telegram-hero-bg {
    background-size: auto 60%;
    }
}

@screen xl {
  .telegram-hero-bg {
    background-size: auto 65%;
    }
}
</style>