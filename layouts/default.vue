<script setup>
const appConfig = useAppConfig()
const siteConfig = useSiteConfig()
</script>

<template>
  <div class="animate-fade-in">
    <Header
      :site-name="siteConfig.name"
      class="font-medium heading"
      :links="appConfig.headerLinks"
    />
    <main class="min-h-70vh">
      <slot />
    </main>
    <Footer class="p3" />
  </div>
</template>
