<script setup lang="ts">
interface DropdownItem {
  text: string
  href: string
}

interface NavLink {
  text: string
  href?: string
  dropdown?: DropdownItem[]
}

interface Props {
  active: boolean
  links: NavLink[]
}

const props = defineProps<Props>()
const emit = defineEmits(['navigate'])

const openGroups = reactive<Record<string, boolean>>({})

function toggleGroup(name: string) {
  openGroups[name] = !openGroups[name]
}

const MOBILE_BREAKPOINT = 1024

function handleResize() {
  if (window.innerWidth >= MOBILE_BREAKPOINT && props.active) {
    emit('navigate')
  }
}

onMounted(() => {
  window.addEventListener('resize', handleResize)
})

onUnmounted(() => {
  window.removeEventListener('resize', handleResize)
})

watch(
  () => props.active,
  (isActive) => {
    document.body.style.overflow = isActive ? 'hidden' : ''
    if (!isActive) {
      // Close all dropdowns when mobile menu is deactivated
      Object.keys(openGroups).forEach(key => delete openGroups[key])
    }
  }
)
</script>

<template>
  <Transition name="transition-content" appear>
    <div
      v-if="props.active"
      class="mobile-nav fixed inset-0 z-40 flex flex-col bg-brand-3/80 backdrop-blur-md" @click.self="$emit('navigate')"
      :class="$attrs.class" >
      <div class="h-20 flex-shrink-0"></div>

      <div class="flex-grow overflow-y-auto">
        <div class="grid grid-cols-12">
          <div class="col-span-10 col-start-2 flex flex-col pt-32 pb-8 space-y-4">
            <nav aria-label="Mobile navigation" class="flex-grow flex flex-col justify-start">
              <ul>
                <li
                  v-for="(link, index) in props.links"
                  :key="index"
                  class="mb-3 last:mb-0"
                >
                  <template v-if="link.dropdown && link.dropdown.length">
                    <button
                      @click="toggleGroup(link.text)"
                      :aria-expanded="!!openGroups[link.text]"
                      :aria-controls="`submenu-${index}`"
                      role="button"
                      class="flex justify-between items-center w-full font-semibold uppercase tracking-wide text-white/80 hover:text-white px-0 py-4 rounded-md transition-shadow shadow-sm focus:outline-none border-b border-white/10"
                    >
                      <span class="mobile-nav-link font-semibold uppercase tracking-wide text-white/80 hover:text-white leading-none">
                        {{ link.text }}
                      </span>
                      <svg
                        :class="{ 'rotate-90': openGroups[link.text] }"
                        class="w-5 h-5 text-white/80 transition-transform duration-300"
                        fill="none"
                        stroke="currentColor"
                        stroke-width="2"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                        aria-hidden="true"
                      >
                        <path stroke-linecap="round" stroke-linejoin="round" d="M9 5l7 7-7 7" />
                      </svg>
                    </button>

                    <Transition
                      enter-active-class="transition ease-out duration-300"
                      enter-from-class="opacity-0 -translate-y-2"
                      enter-to-class="opacity-100 translate-y-0"
                      leave-active-class="transition ease-in duration-200"
                      leave-from-class="opacity-100 translate-y-0"
                      leave-to-class="opacity-0 -translate-y-2"
                    >
                      <ul
                        v-show="openGroups[link.text]"
                        :id="`submenu-${index}`"
                        class="pl-6 border-l-2 border-white/30 space-y-2 bg-white/5 rounded-l mt-2"
                        role="menu"
                      >
                        <li
                          v-for="(child, childIndex) in link.dropdown"
                          :key="childIndex"
                          class="mb-2 last:mb-0"
                          role="none"
                        >
                          <AppLink
                            :href="child.href"
                            class="mobile-nav-link dropdown-subitem block uppercase tracking-wide text-white/70 hover:text-white px-0 py-2 rounded-md transition-colors"
                            role="menuitem"
                            @click="$emit('navigate')"
                          >
                            {{ child.text }}
                          </AppLink>
                        </li>
                      </ul>
                    </Transition>
                  </template>

                  <template v-else>
                    <AppLink
                      :href="link.href"
                      class="mobile-nav-link font-semibold uppercase tracking-wide text-white/80 hover:text-white px-0 py-4 rounded-md transition-shadow shadow-sm border-b border-white/10"
                      @click="$emit('navigate')"
                    >
                      {{ link.text }}
                    </AppLink>
                  </template>
                </li>
              </ul>
            </nav>

            <div class="mt-auto px-6 pt-8 pb-8">
              <SocialNetworks />
            </div>
          </div>
        </div>
      </div>
    </div>
  </Transition>
</template>

<style scoped lang="postcss">
/* This is essential: ensures the scrollable part takes up the remaining height */
.mobile-nav > .flex-grow {
  height: calc(100vh - var(--header-height));
}

.mobile-nav-link {
  position: relative;
  font-size: 1.25rem;
  line-height: 1.4;
  font-weight: 600;
  font-family: "Epilogue", Epilogue fallback;
}

/* Dropdown submenu items slightly smaller */
.dropdown-subitem.mobile-nav-link {
  font-size: 1rem;
  font-weight: 400;
  line-height: 1.5;
}

.transition-content-enter-active,
.transition-content-leave-active {
  @apply transition transform duration-300 ease-in-out opacity-100 scale-100;
}

.transition-content-enter-from,
.transition-content-leave-to {
  @apply opacity-0 scale-105;
}

.rotate-90 {
  transform: rotate(90deg);
}
</style>