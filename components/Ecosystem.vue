<script lang="ts" setup>
import MailingListSignup from './MailingListSignup.vue'

const discord = useSocialNetwork('discord')
</script>

<template>
  <SectionHeader
    eyebrow="Get Involved"
    title="Storacha is open sauce, it needs you. 🌶️"
    description="Become part of the ecosystem and build on top of Storacha's blazing fast, decentralized storage and retrieval network or contribute to the protocol and interfaces!"
    :actions="[
      { text: 'Join Dev Community', href: discord?.href, primary: true },
      { asComponent: MailingListSignup, outline: true },
    ]"
  />
  <Section class="ecosystem mt-12" full-width>
    <Heading type="h4" class="text-center">
      THE STORACHA ECOSYSTEM
    </Heading>
    <EcosystemGrid class="mt-12" :limit="3" />
    <div class="mt-10 flex items-center justify-center p1">
      <AppLink href="/ecosystem" primary class="flex items-center gap-1 lh-none">
        Explore Full Ecosystem<AppIcon i="i-carbon:arrow-right" />
      </AppLink>
    </div>
  </Section>
</template>