<script setup lang="ts">
interface NavLink {
  text: string
  href?: string
  dropdown?: { text: string; href: string }[]
}

const props = defineProps<{
  active: boolean
  links: NavLink[]
}>()

const emit = defineEmits(['close-menu'])
const openGroups = reactive<Record<string, boolean>>({})

function getMenuIcon(text: string) {
  const iconMap: Record<string, string> = {
    'Home': 'i-carbon-home',
    'Product': 'i-carbon-cube',
    'Referrals': 'i-carbon-user-multiple',
    'Ecosystem': 'i-carbon-network-3',
    'Node Providers': 'i-carbon-cloud-service-management',
    'Blog': 'i-carbon-blog',
    'Docs': 'i-carbon-document',
    'Start Storing': 'i-carbon-play-filled'
  }
  return iconMap[text] || 'i-carbon-dot-mark'
}

function getSubMenuIcon(text: string) {
  const iconMap: Record<string, string> = {
    'Bluesky Storage': 'i-arcticons-butterflymx',
    'Storacha AI': 'i-carbon-watson-machine-learning',
    'Storacha Console': 'i-carbon-dashboard',
    'Roadmap': 'i-carbon-roadmap'
  }
  return iconMap[text] || 'i-carbon-arrow-right'
}

function toggleGroup(name: string) {
  openGroups[name] = !openGroups[name]
}

function handleNavigate() {
  emit('close-menu')
}

function handleResize() {
  if (process.client && window.innerWidth >= 768 && props.active) {
    emit('close-menu')
  }
}

onMounted(() => {
  if (process.client) {
    window.addEventListener('resize', handleResize)
  }
})

onUnmounted(() => {
  if (process.client) {
    window.removeEventListener('resize', handleResize)
  }
})

watch(() => props.active, (isActive) => {
  document.body.style.overflow = isActive ? 'hidden' : ''
  if (!isActive) { 
    Object.keys(openGroups).forEach(key => delete openGroups[key]) 
  }
})
</script>

<template>
  <Transition name="fade">
    <div
      v-if="active"
      class="mobile-nav fixed inset-0 z-50 flex flex-col bg-brand-3/80 text-white backdrop-blur-md"
      style="min-height: 100vh; min-height: 100dvh;"
    >
      <!-- Remove Notice from here - let header's Notice show through -->
      <div class="h-20 flex flex-shrink-0 items-center justify-between">
        <div class="grid-margins w-full flex items-center justify-between">
          <AppLink href="/" @click="handleNavigate" class="flex items-center">
            <Ident site-name="Storacha" class="h-10" :invert="true" />
          </AppLink>
          <button aria-label="Close Mobile Menu" @click="$emit('close-menu')">
            <div class="i-carbon-close h-8 w-8" />
          </button>
        </div>
      </div>

      <!-- Scrollable content area that takes available space -->
      <div class="flex-1 overflow-y-auto flex flex-col min-h-0">
        <!-- Menu content area - explicitly left aligned -->
        <div class="grid-margins pt-4 self-start w-full">
          <nav class="pl-0">
            <ul>
              <li v-for="link in links" :key="link.text">
                <template v-if="link.dropdown">
                  <h1 class="mb-3">
                    <button class="mobile-nav-link flex w-full items-center justify-between" @click="toggleGroup(link.text)">
                      <div class="flex items-center">
                        <div class="w-10 h-10 flex items-center justify-center flex-shrink-0 mr-3">
                          <AppIcon :i="getMenuIcon(link.text)" class="text-2xl" />
                        </div>
                        <span>{{ link.text }}</span>
                      </div>
                      <AppIcon i="i-carbon-chevron-right" class="text-3xl transition-transform duration-200" :class="{ 'rotate-90': openGroups[link.text] }" />
                    </button>
                  </h1>
                  <ul v-show="openGroups[link.text]" class="mb-3 space-y-2 pl-6">
                    <li v-for="sublink in link.dropdown" :key="sublink.href">
                      <AppLink class="mobile-nav-sublink flex items-center" :href="sublink.href" @click="handleNavigate">
                        <div class="w-8 h-8 flex items-center justify-center flex-shrink-0 mr-3 ml-5">
                          <AppIcon :i="getSubMenuIcon(sublink.text)" class="text-lg opacity-70" />
                        </div>
                        {{ sublink.text }}
                      </AppLink>
                    </li>
                  </ul>
                </template>
                <template v-else>
                  <h1 class="mb-3">
                    <AppLink class="mobile-nav-link flex items-center" :href="link.href" @click="handleNavigate">
                      <div class="w-10 h-10 flex items-center justify-center flex-shrink-0 mr-3">
                        <AppIcon :i="getMenuIcon(link.text)" class="text-2xl" />
                      </div>
                      {{ link.text }}
                    </AppLink>
                  </h1>
                </template>
              </li>
            </ul>
          </nav>
        </div>
        
        <!-- Social networks pinned to actual bottom of screen -->
        <div class="mt-auto pb-8 flex justify-center flex-shrink-0">
          <SocialNetworks />
        </div>
      </div>
    </div>
  </Transition>
</template>

<style scoped lang="postcss">
/* Fix for mobile keyboard/viewport issues */
.mobile-nav {
  /* Ensure overlay always covers full screen even during keyboard transitions */
  min-height: 100vh;
  min-height: 100dvh; /* Modern dynamic viewport height */
  width: 100vw;
  width: 100dvw; /* Modern dynamic viewport width */
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  /* Prevent content from being affected by address bar changes */
  -webkit-overflow-scrolling: touch;
  overscroll-behavior: none;
}

/* Mobile menu best practices for touch targets and hierarchy */
.mobile-nav-link {
  position: relative;
  /* Level 1: Large text for primary navigation */
  font-family: var(--un-font-heading);
  font-size: 1.5rem; /* 24px - optimal for touch */
  line-height: 1.4;
  font-weight: 500;
  /* Minimum 44px touch target (Apple guidelines) */
  min-height: 44px;
  display: flex;
  align-items: center;
  /* Override button scaling */
  transform: none !important;
  scale: 1 !important;
  transition: none !important;
}

.mobile-nav-link:hover,
.mobile-nav-link:active,
.mobile-nav-link:focus {
  transform: none !important;
  scale: 1 !important;
}

.mobile-nav-sublink {
  /* Level 2: Slightly smaller but still easily tappable */
  font-family: var(--un-font-heading);
  font-size: 1.25rem; /* 20px - good hierarchy while remaining tappable */
  line-height: 1.4;
  font-weight: 400;
  color: white; /* White instead of grey for better readability */
  /* Minimum 44px touch target */
  min-height: 44px;
  display: flex;
  align-items: center;
  /* Hover effect for better feedback */
  transition: opacity 0.2s ease;
}

.mobile-nav-sublink:hover {
  opacity: 0.8;
}

.fade-enter-active,
.fade-leave-active {
  @apply transition-opacity duration-200 ease-in-out;
}

.fade-enter-from,
.fade-leave-to {
  @apply opacity-0;
}

.rotate-90 {
  transform: rotate(90deg);
}

.mobile-nav nav {
  transform: translateZ(0);
  will-change: auto;
}
</style>