<script setup>
const siteConfig = useSiteConfig()

const { stylesLoaded, stylesError, loadGhostStyles } = useGhostStyles()

onMounted(async () => {
  if (!stylesLoaded.value) {
    console.log('🎨 Loading Ghost styles in layout')
    await loadGhostStyles()
  }
})

useHead({
  htmlAttrs: {
    class: 'ghost-layout-active'
  },
  bodyAttrs: {
    class: 'ghost-page-body'
  }
})
</script>

<template>
  <div class="ghost-layout">
    <!-- Direct CSS Fix - BYPASSES the loading issue -->
    <ClientOnly>
      <DirectGhostFix />
    </ClientOnly>

    <!-- Debug Panel - ALWAYS VISIBLE for debugging -->
    <ClientOnly>
      <GhostDebugger />
    </ClientOnly>

    <!-- Your existing header content -->
    <header class="ghost-header">
      <div class="ghost-container">
        <nav class="ghost-nav" role="navigation" aria-label="Main navigation">
          <NuxtLink to="/" class="ghost-logo">
            <img 
              src="/favicon.ico" 
              alt="" 
              class="ghost-logo-icon"
              width="24" 
              height="24"
            />
            {{ siteConfig.name }}
          </NuxtLink>
          
          <div class="ghost-nav-links">
            <NuxtLink to="/ghost" class="ghost-nav-link">📝 Blog</NuxtLink>
            <NuxtLink to="/blog" class="ghost-nav-link">📰 Medium</NuxtLink>
            <NuxtLink to="/" class="ghost-nav-link">🏠 Home</NuxtLink>
          </div>
        </nav>
      </div>
    </header>

    <main class="ghost-main" role="main">
      <div class="ghost-container">
        <div v-if="$dev && stylesError" class="css-status-banner">
          ⚠️ Ghost CSS loaded with fallback styles
        </div>
        
        <slot />
      </div>
    </main>

    <!-- Your existing footer content -->
    <footer class="ghost-footer" role="contentinfo">
      <div class="ghost-container">
        <div class="ghost-footer-content">
          <nav class="ghost-footer-nav" aria-label="Footer navigation">
            <NuxtLink to="/ghost" class="ghost-footer-link">← Back to Blog</NuxtLink>
            <NuxtLink to="/" class="ghost-footer-link">Home</NuxtLink>
          </nav>
          
          <div class="ghost-footer-info">
            <span class="ghost-footer-text">Powered by Ghost CMS</span>
            <span class="ghost-footer-separator">•</span>
            <span class="ghost-footer-text">{{ new Date().getFullYear() }} Storacha Network</span>
          </div>
        </div>
      </div>
    </footer>
  </div>
</template>

<!-- Keep all your existing styles -->
<style scoped>
/* Your existing CSS styles stay exactly the same */
</style>