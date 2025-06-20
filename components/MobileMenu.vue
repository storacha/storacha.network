<script setup lang="ts">
interface Props {
  active: boolean
  links: Array<
    { text: string; href: string } |
    { text: string; isGroup: true }
  >
}
defineProps<Props>()
defineEmits(['navigate'])
</script>

<template>
  <Transition name="transition-content">
    <div v-if="active" class="mobile-nav fixed inset-x-0 top-0 z-40 grid grid-cols-12 h-full">
      <div class="col-span-10 col-start-2 flex flex-col py-8">
        <div class="flex flex-grow flex-col justify-center">
          <nav>
            <div v-for="(link, index) in links" :key="index" class="mb-3">
              <template v-if="'isGroup' in link">
                <div class="uppercase text-sm font-semibold text-white/60 tracking-wide mb-2 mt-4">
                  {{ link.text }}
                </div>
              </template>
              <template v-else>
                <AppLink class="mobile-nav-link" :href="link.href" @click="$emit('navigate')">
                  {{ link.text }}
                </AppLink>
              </template>
            </div>
          </nav>
        </div>
        <SocialNetworks />
      </div>
    </div>
  </Transition>
</template>

<style lang="postcss" scoped>
.mobile-nav-link {
  position: relative;
  @apply h1 leading-normal;
}

.transition-content-enter-active,
.transition-content-leave-active {
  @apply transition transform duration-300 ease-in-out opacity-100 scale-100;
}

.transition-content-enter-from,
.transition-content-leave-to {
  @apply opacity-0 scale-105;
}
</style>
