<script setup lang='ts'>
defineProps({
  noHero: Boolean,
  siteName: String,
})

const headerLinks = [
  { text: 'Home', link: '/' },
]

const mobileLinks = [
  ...headerLinks,
]

// state
const { x, y } = useWindowScroll()
const header = ref('header')
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
    ref="header" class="a-enter top-0 z-50 w-full transform transition duration-300 ease-out" :class="[
      nav.isTransparent ? 'bg-transparent' : 'bg-white/80 backdrop-blur-md',
      noHero ? 'static' : 'fixed',
      {
        '-translate-y-full': nav.isSticky,
        'is-visible': nav.isVisible,
        'mobile-nav-open': nav.mobileActive,
      },
    ]"
    v-bind="$attrs"
  >
    <div class="grid-margins h-30 flex items-center justify-between">
      <AppLink class="ident transition hover:opacity-75" href="/" title="">
        <Ident :site-name="siteName" class="xl:-ml-30px" />
      </AppLink>
      <nav class="hidden max-w-lg w-full justify-right md:flex">
        <AppLink v-for="link in headerLinks" :key="link.text" :href="link.link" class="nav-link relative ml-24">
          {{ link.text }}
        </AppLink>
      </nav>
      <button aria-label="Toggle Mobile Menu" class="mobile-nav-link sm:visible md:hidden" @click="toggleMobileMenu">
        <div class="hamburger-icon h-8 w-8" />
      </button>
    </div>
  </header>
  <MobileMenu :active="nav.mobileActive" :links="mobileLinks" class="bg-brand-3/80 text-dark backdrop-blur-md" v-bind="$attrs" @navigate="nav.mobileActive = false" />
</template>

<style scoped lang="postcss">
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

.a-enter {
  animation: fadeIn 1s ease forwards, slideIn 0.5s ease forwards;;
}
.is-visible {
  @apply translate-y-0;
}

.mobile-nav-open {
  @apply text-dark bg-transparent;
}

.hamburger-icon {
  @apply relative;
}

.hamburger-icon::before,
.hamburger-icon::after {
  content: '';
  background-color: currentColor;
  height: 2px;
  @apply absolute;
  @apply w-full;
  @apply left-0;
  @apply transition-transform;
  @apply duration-300;
  @apply ease-in-out;
  @apply origin-center;
  @apply transform;
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

a:hover:not(.ident) {
  @apply b-b-1 b-black;
}

.router-link-active:not(.ident) {
  @apply b-b-1 b-black;
}

/* hide menu for landing */
.mobile-nav-link, nav {
  @apply hidden;
}
</style>
