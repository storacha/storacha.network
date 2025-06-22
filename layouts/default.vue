<script setup>
const headerLinks = [...useActions('headerLinks')]
const siteConfig = useSiteConfig()
const startAction = useActions('start')

const mobileMenuActive = useMobileMenuState()

const mobileLinks = [
  startAction,
  ...headerLinks,
]

function toggleMobileMenu() {
  mobileMenuActive.value = !mobileMenuActive.value
}

function closeMobileMenu() {
  mobileMenuActive.value = false
}
</script>

<template>
  <div class="animate-fade-in">
    <Header
      v-show="!mobileMenuActive"
      :site-name="siteConfig.name"
      class="font-medium heading"
      :links="headerLinks"
      :start-action="startAction"
      @toggle-menu="toggleMobileMenu"
    />
    
    <MobileMenu 
      :active="mobileMenuActive" 
      :links="mobileLinks"
      @close-menu="closeMobileMenu"
    />
    
    <main class="min-h-70vh">
      <slot />
    </main>

    <Section padding>
      <Footer class="p3" />
    </Section>
  </div>
</template>