<script setup>
const headerLinks = [...useActions('headerLinks'), useActions('start')]
const siteConfig = useSiteConfig()
</script>

<template>
  <div class="animate-fade-in">
    <Header
      :site-name="siteConfig.name"
      class="font-medium heading"
      :links="headerLinks"
    />
    <main class="min-h-70vh">
      <slot />
    </main>
    <Section padding>
      <Footer class="p3" />
    </Section>
  </div>
</template>
