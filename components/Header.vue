<script setup lang='ts'>
import type { NavLinks } from '~/types/navLinks'

interface HeaderProps {
  noHero?: boolean
  siteName: string
  links: NavLinks
}

const props = defineProps<HeaderProps>()

const headerLinks = [
  ...props.links,
]

const mobileLinks = [
  { text: 'Home', href: '/' },
  ...headerLinks,
]

// state
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

// watch scroll position and update nav visibility state (throttled)
// eslint-disable-next-line unused-imports/no-unused-vars
watch([x, y], useThrottleFn(([x, y], [px, py]) => {
  // set nav transparency
  if (y > nav.threshold)
    nav.isTransparent = false
  else if (y <= nav.offset)
    nav.isTransparent = true
  // set nav sticky
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
    ref="header" class="header a-enter top-0 z-50 w-full transform transition duration-300 ease-out" :class="[
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
    <div class="grid-margins h-20 flex items-center justify-between transition-all">
      <AppLink class="ident transition" href="/" title="">
        <Ident :site-name="siteName" class="ident h-10 translate-x--1rem" />
      </AppLink>
      <nav class="navbar hidden justify-right gap-1 b-2 b-brand-3 md:flex">
        <AppLink v-for="link in headerLinks" :key="link.text" :href="link.href" class="nav-link bg-transparent btn-secondary btn-slim btn hover:bg-white" active-class="btn-active">
          {{ link.text }}
        </AppLink>
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
  /* apply global header scroll-padding */
  scroll-padding-top: var(--header-height);
}
</style>

<style scoped lang="postcss">
header.header {
  /* stops layout shift with the body is overflow-hidden */
  padding-right: var(--scrollbar-width);
}
.navbar {
  @apply bg-brand-4 rounded-full p-1;
  > a:last-child {
    @apply btn btn-slim;
  }
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
  animation: fadeIn 1s ease forwards, slideIn 0.5s ease forwards;;
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
