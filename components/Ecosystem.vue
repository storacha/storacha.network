<script lang="ts" setup>
const discord = useSocialNetwork('discord')
const mailingList = useActions('mailingList')
</script>

<template>
  <SectionHeader
    eyebrow="Get Involved"
    title="Storacha is open sauce, it needs you. 🌶️"
    description="Stay in touch and be one of the first to add some serious heat to your network with our blazing fast, decentralized storage and retrieval solutions!"
    :actions="[{ text: 'Join Dev Community', href: discord?.href, primary: true }, { outline: true, ...mailingList }]"
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

<style>

</style>
