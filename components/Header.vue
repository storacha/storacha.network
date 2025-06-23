<script setup lang="ts">
import type { NavLinks } from '~/types/navLinks'

defineProps<{
  siteName: string
  links: NavLinks
  startAction?: { text: string; href: string }
}>()
defineEmits(['toggle-menu'])

const { y } = useWindowScroll()
const nav = reactive({
  isTransparent: true,
  threshold: 100,
})

// Safe app config access with fallback
const appConfig = computed(() => {
  try {
    return useAppConfig()
  } catch {
    return {
      notice: {
        displayUntil: '',
        text: '',
        href: ''
      }
    }
  }
})

// Dropdown state management
const openDropdown = ref<string | null>(null)
let hoverTimeout: NodeJS.Timeout | null = null

function toggleDropdown(linkText: string) {
  openDropdown.value = openDropdown.value === linkText ? null : linkText
  // Clear any pending close timeout when clicking
  if (hoverTimeout) {
    clearTimeout(hoverTimeout)
    hoverTimeout = null
  }
}

function openDropdownOnHover(linkText: string) {
  // Clear any pending close timeout
  if (hoverTimeout) {
    clearTimeout(hoverTimeout)
    hoverTimeout = null
  }
  openDropdown.value = linkText
}

function closeDropdownWithDelay() {
  // Add delay to allow mouse to move to dropdown
  hoverTimeout = setTimeout(() => {
    openDropdown.value = null
  }, 100)
}

function cancelClose() {
  // Cancel closing when mouse enters dropdown area
  if (hoverTimeout) {
    clearTimeout(hoverTimeout)
    hoverTimeout = null
  }
}

// Close dropdown when clicking outside
function handleClickOutside(event: Event) {
  const target = event.target as Element
  if (!target.closest('.dropdown-container')) {
    openDropdown.value = null
  }
}

onMounted(() => {
  if (process.client) {
    document.addEventListener('click', handleClickOutside)
  }
})

onUnmounted(() => {
  if (process.client) {
    document.removeEventListener('click', handleClickOutside)
  }
})

watch(y, (newY) => {
  if (newY > nav.threshold) {
    nav.isTransparent = false
  }
  else {
    nav.isTransparent = true
  }
})
</script>

<template>
  <header
    class="top-0 z-40 w-full fixed transition-colors duration-300 ease-out"
    :class="[nav.isTransparent ? 'bg-transparent' : 'is-active']"
  >
    <Notice v-bind="appConfig.notice" />
    <div class="grid-margins h-20 flex items-center justify-between">
      <AppLink class="ident transition" href="/" title="">
        <Ident :site-name="siteName" class="h-10" />
      </AppLink>
      <nav class="navbar hidden items-center justify-right gap-1 rounded-full p-1 b-2 b-brand-3 md:flex">
        <div 
          v-for="link in links" 
          :key="link.text" 
          class="relative dropdown-container"
          @mouseleave="link.dropdown ? closeDropdownWithDelay() : null"
          @mouseenter="link.dropdown ? cancelClose() : null"
        >
          <template v-if="link.dropdown">
            <button 
              class="nav-link btn btn-secondary btn-slim flex items-center gap-1"
              @click="toggleDropdown(link.text)"
              @mouseenter="openDropdownOnHover(link.text)"
              :class="{ 'dropdown-active': openDropdown === link.text }"
            >
              {{ link.text }}
              <div 
                class="chevron-icon transition-transform duration-200"
                :class="{ 'rotate-180': openDropdown === link.text }"
              >
                <div class="i-carbon-chevron-down text-sm" />
              </div>
            </button>
            <Transition name="dropdown">
              <div 
                v-if="openDropdown === link.text"
                class="dropdown-panel"
                @mouseenter="cancelClose"
                @mouseleave="closeDropdownWithDelay"
              >
                <AppLink
                  v-for="sublink in link.dropdown"
                  :key="sublink.text"
                  :href="sublink.href"
                  class="dropdown-item"
                  @click="openDropdown = null"
                >
                  {{ sublink.text }}
                </AppLink>
              </div>
            </Transition>
          </template>
          <template v-else>
            <AppLink
              :href="link.href"
              class="nav-link btn-secondary btn-slim btn hover:(bg-white)"
              active-class="btn-active"
            >
              {{ link.text }}
            </AppLink>
          </template>
        </div>
        <AppLink v-if="startAction" :href="startAction.href" class="btn btn-slim bg-brand-3 text-white hover:bg-brand-2">
          {{ startAction.text }}
        </AppLink>
      </nav>
      <button aria-label="Toggle Mobile Menu" class="mobile-nav-link md:hidden" @click="$emit('toggle-menu')">
        <div class="hamburger-icon relative h-8 w-8 text-brand-3" />
      </button>
    </div>
  </header>
</template>

<style scoped lang="postcss">
/* Dropdown panel styling */
.dropdown-panel { 
  @apply absolute left-0 top-full bg-white rounded-xl shadow-lg z-50 min-w-[12rem] py-2;
  margin-top: 4px;
  border: 1px solid #e5e7eb;
}

/* Individual dropdown items */
.dropdown-item {
  display: block;
  padding: 8px 16px;
  margin: 2px 4px;
  border-radius: 6px;
  text-decoration: none !important;
  transition: all 0.15s ease;
  /* Storacha brand styling */
  font-family: var(--un-font-heading); /* Epilogue */
  font-size: 0.875rem; /* 14px */
  font-weight: 500;
  color: #E91315 !important; /* brand-3 - Storacha red */
  line-height: 1.4;
}

.dropdown-item:hover {
  background-color: #EFE3F3 !important; /* brand-4 - Storacha pink */
  color: #E91315 !important; /* Keep brand-3 - Storacha red text */
  transform: translateY(-1px);
}

/* Button states */
.dropdown-active {
  @apply bg-white text-brand-3;
}

/* Chevron rotation */
.rotate-180 {
  transform: rotate(180deg);
}

/* Dropdown animations */
.dropdown-enter-active,
.dropdown-leave-active {
  transition: all 0.15s ease-out;
  transform-origin: top;
}

.dropdown-enter-from,
.dropdown-leave-to {
  opacity: 0;
  transform: translateY(-4px) scaleY(0.95);
}

.dropdown-enter-to,
.dropdown-leave-from {
  opacity: 1;
  transform: translateY(0) scaleY(1);
}

/* Existing styles */
.btn-active:after, 
.nav-link:hover:after { 
  @apply bg-brand-3; 
  bottom: 8px; 
  content: ""; 
  height: 1px; 
  left: 50%; 
  margin-left: -10px; 
  position: absolute; 
  width: 20px; 
}

.navbar { 
  @apply bg-brand-4; 
}

.is-active { 
  @apply bg-white/90 backdrop-blur-sm; 
}

.is-active .navbar { 
  @apply bg-transparent; 
}

.hamburger-icon::before, 
.hamburger-icon::after { 
  content: ''; 
  background-color: currentColor; 
  height: 2px; 
  position: absolute; 
  left: 0; 
  width: 100%; 
  transition: all 0.3s ease;
}

.hamburger-icon::before { 
  top: 10px; 
}

.hamburger-icon::after { 
  top: 20px; 
}
</style>