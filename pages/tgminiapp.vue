<script setup lang="ts">
import FreeStorage from '~/components/FreeStorage.vue'

// SEO metadata for telegram backup page
useSeoMeta({
  title: 'Backup Telegram Chats | Secure Decentralized Storage - Storacha',
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

function startBackup() {
  // Handle backup initiation
}
</script>

<template>
  <TransitionProvider>
    <!-- Hero Section -->
    <Section class="telegram-hero-section">
      <HeroBase class="sm:min-h-200">
        <template #left>
          <SectionHeader
            class="hero-content color-brand-3"
            title="🚨 Don't Lose Your Telegram Chats"
            description="Backup your 1-on-1s, groups, and channels to Storacha's decentralized storage - safe, private, forever."
          />
          <div class="mt-6 color-brand-3 prose p1">
            <button
              class="cta-button min-w-64 rounded-lg bg-red-500 px-8 py-4 text-xl color-white font-bold transition-all duration-200 hover:bg-red-600 hover:shadow-lg"
              @click="startBackup"
            >
              Start Backup Now
            </button>
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
                  Every time you back up your Telegram chats, you're not just securing your data, you're also stacking rewards.
                </p>
                <div class="callout-box my-4 rounded-lg bg-brand-6 p-4">
                  <div class="text-2xl color-brand-1 font-bold">
                    💎 Earn 10,000 mini Rachas per GB backed up
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
    <Section class="bg-brand-6 color-brand-3" padding>
      <div class="mb-8 text-center">
        <Heading type="h2" class="mb-4 font-medium">
          How to Get Started
        </Heading>
      </div>
      <div class="grid gap-8 md:grid-cols-3">
        <div class="text-center">
          <div class="mb-4 text-4xl">
            🔑
          </div>
          <Heading type="h3" class="mb-2 font-medium">
            Step 1: Authorize OTP
          </Heading>
          <p class="prose p2">
            Give permission so the miniapp can read your chats (we can't back them up otherwise).
          </p>
        </div>
        <div class="text-center">
          <div class="mb-4 text-4xl">
            ⚡
          </div>
          <Heading type="h3" class="mb-2 font-medium">
            Step 2: Create Storacha Account
          </Heading>
          <p class="prose p2">
            It takes seconds. Your encryption key is generated on your device.
          </p>
        </div>
        <div class="text-center">
          <div class="mb-4 text-4xl">
            🚀
          </div>
          <Heading type="h3" class="mb-2 font-medium">
            Step 3: Start Backup
          </Heading>
          <p class="prose p2">
            Start your backup in seconds: simple, private, and encrypted.
          </p>
        </div>
      </div>
      <div class="mt-6 text-center">
        <p class="prose p2">
          For additional support, please see our step-by-step guide and FAQ.
        </p>
      </div>
    </Section>

    <!-- Security & Benefits Section -->
    <Section class="bg-brand-6 color-brand-3" padding>
      <div class="mb-8 text-center">
        <Heading type="h2" class="mb-4 font-medium">
          Security & Benefits
        </Heading>
      </div>
      <div class="grid gap-6 lg:grid-cols-4 md:grid-cols-2">
        <div class="rounded-lg bg-white p-4 text-center">
          <div class="mb-3 text-3xl">
            🔐
          </div>
          <Heading type="h4" class="mb-2 font-medium">
            Your Key, Your Data
          </Heading>
          <p class="p3 prose">
            Encryption happens on your device. We never see your messages.
          </p>
        </div>
        <div class="rounded-lg bg-white p-4 text-center">
          <div class="mb-3 text-3xl">
            🌍
          </div>
          <Heading type="h4" class="mb-2 font-medium">
            Decentralized
          </Heading>
          <p class="p3 prose">
            No central point of failure. Your chats are always recoverable.
          </p>
        </div>
        <div class="rounded-lg bg-white p-4 text-center">
          <div class="mb-3 text-3xl">
            🏆
          </div>
          <Heading type="h4" class="mb-2 font-medium">
            Earn Rewards
          </Heading>
          <p class="p3 prose">
            Back up and stack loyalty points you can redeem later.
          </p>
        </div>
        <div class="rounded-lg bg-white p-4 text-center">
          <div class="mb-3 text-3xl">
            ⚡
          </div>
          <Heading type="h4" class="mb-2 font-medium">
            MiniApp Magic
          </Heading>
          <p class="p3 prose">
            Open inside Telegram via bot. No downloads, no hassle.
          </p>
        </div>
      </div>
    </Section>

    <!-- Final CTA Section -->
    <Section class="bg-red-600 text-center color-white" padding>
      <Heading type="h2" class="mb-4 font-medium">
        Don't wait until it's too late.
      </Heading>
      <div class="mx-auto max-w-xl">
        <p class="mb-6 text-lg prose p1">
          Protect your Telegram chats today with Storacha.
        </p>
      </div>
      <button
        class="cta-button-large min-w-80 rounded-lg bg-white px-12 py-5 text-2xl color-red-600 font-bold transition-all duration-200 hover:bg-gray-100 hover:shadow-xl"
        @click="startBackup"
      >
        Start Backup Now
      </button>
    </Section>

    <FreeStorage />
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
  background: url(/img/tgminiapp/hero_bg.png) no-repeat center center;
  background-size: cover;
  background-attachment: fixed;
  overflow: hidden;
}

.telegram-hero-section::after {
  content: '';
  position: absolute;
  top: 50%;
  right: 5%;
  transform: translateY(-50%);
  width: 500px;
  height: 500px;
  background: url(/img/tgminiapp/hero.png) no-repeat center center;
  background-size: contain;
  z-index: 1;
  pointer-events: none;
}

.hero-content {
  position: relative;
  z-index: 2;
  text-shadow: 0 1px 3px rgba(0, 0, 0, 0.2);
}

.cta-button {
  cursor: pointer;
  border: none;
  display: inline-block;
  text-decoration: none;
  box-shadow: 0 4px 12px rgba(239, 68, 68, 0.3);
  position: relative;
  z-index: 2;
}

.cta-button-large {
  cursor: pointer;
  border: none;
  display: inline-block;
  text-decoration: none;
  box-shadow: 0 6px 20px rgba(0, 0, 0, 0.15);
}

.cta-button:hover,
.cta-button-large:hover {
  transform: translateY(-2px);
  transition: all 0.2s ease;
}

.callout-box {
  border-left: 4px solid var(--brand-1);
}

/* Mobile responsiveness */
@screen sm {
  .telegram-hero-section {
    background-attachment: scroll;
  }

  .telegram-hero-section::after {
    width: 350px;
    height: 350px;
    right: 10px;
    opacity: 0.8;
  }
}

@screen md {
  .telegram-hero-section::after {
    width: 420px;
    height: 420px;
    right: 3%;
  }
}

@screen lg {
  .telegram-hero-section::after {
    width: 500px;
    height: 500px;
    right: 5%;
  }
}

@screen xl {
  .telegram-hero-section::after {
    width: 580px;
    height: 580px;
    right: 8%;
  }
}
</style>
