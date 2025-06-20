<script setup lang='ts'>
import type { NavLinks } from '~/types/navLinks'

interface HeaderProps {
  noHero?: boolean
  siteName: string
  links: NavLinks
}

const props = defineProps<HeaderProps>()

const headerLinks = [...props.links]

const mobileLinks: Array<{ text: string; href: string } | { text: string; isGroup: true }> = [
  { text: 'Home', href: '/' },
  ...headerLinks.flatMap(link => {
    if (link.dropdown?.length) {
      return [
        { text: link.text, isGroup: true as const },
        ...link.dropdown.map(sublink => ({
          text: sublink.text,
          href: sublink.href,
        })),
      ]
    } else if (link.href) {
      return [{ text: link.text, href: link.href }]
    }
    return []
  })
]

const { x, y } = useWindowScroll()
const header = ref()
const nav = reactive({
  isVisible: true,
  isSticky: true,
  isTransparent: true,
  threshold: 100,
  offset: 300,
  mobileActive: false,
})

watch([x, y], useThrottleFn(([x, y], [px, py]) => {
  if (y > nav.threshold)
    nav.isTransparent = false
  else if (y <= nav.offset)
    nav.isTransparent = true

  if (y > nav.offset && y > py + nav.threshold)
    nav.isVisible = false
  else if (y <= nav.offset)
    nav.isVisible = true
  else if (y < py - nav.threshold)
    nav.isVisible = true
}, 30))

function toggleMobileMenu() {
  nav.mobileActive = !nav.mobileActive
}
</script>

<template>
  <header
    ref="header" class="a-enter top-0 z-50 w-full transform transition duration-300 ease-out" :class="[
      nav.isTransparent ? 'bg-transparent' : 'is-active',
      noHero ? 'static' : 'fixed',
      {
        '-translate-y-full': nav.isSticky,
        'is-visible': nav.isVisible,
        'mobile-nav-open': nav.mobileActive,
      },
    ]"
    v-bind="$attrs"
  >
    <Notice v-bind="useAppConfig().notice" />
    <div class="grid-margins h-20 flex items-center justify-between transition-all">
      <AppLink class="ident transition" href="/" title="">
        <Ident :site-name="siteName" class="ident h-10 translate-x--1rem" :invert="nav.mobileActive" />
      </AppLink>
      <nav class="navbar hidden justify-right gap-1 b-2 b-brand-3 md:flex">
        <div
          v-for="link in headerLinks"
          :key="link.text"
          class="relative group"
        >
          <template v-if="link.dropdown">
            <div class="flex flex-col items-start">
              <button class="nav-link btn btn-secondary btn-slim">
                {{ link.text }}
              </button>
              <div class="dropdown-panel">
                <AppLink
                  v-for="sublink in link.dropdown"
                  :key="sublink.text"
                  :href="sublink.href"
                  class="btn btn-slim btn-secondary w-full text-left hover:bg-brand-2 hover:text-white"
                  @click="nav.mobileActive = false"
                >
                  {{ sublink.text }}
                </AppLink>
              </div>
            </div>
          </template>
          <template v-else>
            <AppLink
              :href="link.href"
              class="nav-link btn btn-slim"
              :class="link.text === 'Start Storing' ? 'bg-brand-3 text-white hover:bg-brand-2' : 'btn-secondary hover:bg-white'"
              active-class="btn-active"
            >
              {{ link.text }}
            </AppLink>
          </template>
        </div>
      </nav>
      <button aria-label="Toggle Mobile Menu" class="mobile-nav-link md:hidden" @click="toggleMobileMenu">
        <div class="hamburger-icon relative h-8 w-8 text-brand-3" />
      </button>
    </div>
  </header>
  <MobileMenu :active="nav.mobileActive" :links="mobileLinks" class="bg-brand-3/80 text-white backdrop-blur-md" v-bind="$attrs" @navigate="nav.mobileActive = false" />
</template>

<style>
html {
  --header-height: 80px;
  scroll-padding-top: var(--header-height);
}
</style>

<style scoped lang="postcss">
header {
  padding-right: var(--scrollbar-width);
}

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
  @apply bg-brand-4 rounded-full p-1;
  > a:last-child {
    @apply btn btn-slim;
  }
}

.dropdown-panel {
  @apply absolute left-0 top-full bg-white text-black rounded-xl shadow-lg z-50 min-w-[12rem] py-2 space-y-1;
  opacity: 0;
  visibility: hidden;
  pointer-events: none;
  transition: opacity 0.2s ease, visibility 0.2s ease;
}

.group:hover .dropdown-panel,
.group:focus-within .dropdown-panel {
  opacity: 1;
  visibility: visible;
  pointer-events: auto;
}

@keyframes fadeIn {
  0% { opacity: 0; }
  100% { opacity: 1; }
}

@keyframes slideIn {
  0% {
    transform: translateY(-100px);
  }
  100% {
    transform: translateX(0px);
  }
}

.is-active {
  @apply bg-white/90 backdrop-blur-sm;
  .navbar {
    @apply bg-transparent;
  }
}

.a-enter {
  animation: fadeIn 1s ease forwards, slideIn 0.5s ease forwards;
}

.is-visible {
  @apply translate-y-0;
}

.mobile-nav-open {
  @apply text-dark bg-transparent;
}

.hamburger-icon::before,
.hamburger-icon::after {
  content: '';
  background-color: currentColor;
  height: 2px;
  position: absolute;
  left: 0;
  width: 100%;
  transition-property: all;
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
  transition-duration: 300ms;
  transform-origin: center;
}

.hamburger-icon::before {
  top: 10px;
}

.hamburger-icon::after {
  top: 20px;
}

.mobile-nav-open .hamburger-icon::before,
.mobile-nav-open .hamburger-icon::after {
  top: 15px;
}

.mobile-nav-open .hamburger-icon::before {
  @apply rotate-45;
}

.mobile-nav-open .hamburger-icon::after {
  @apply -rotate-45;
}

.mobile-nav-open .hamburger-icon {
  @apply text-white;
}
</style>
