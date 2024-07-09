<script setup lang="ts">
interface Action {
  text: string
  href: string
  icon?: string
}

interface Props {
  headline: string
  description: string
  eyebrow?: string
  action?: Action
}
withDefaults(defineProps<Props>(), {

})
</script>

<template>
  <!-- hero -->
  <div id="hero-bg" class="min-h-100vh flex">
    <div class="w-full flex flex-col items-center justify-between sm:flex-row sm:gap-8">
      <div class="mt-50 flex items-center sm:mt-0 sm:min-h-100vh">
        <div class="ml-a flex flex-1 flex-col sm:text-left">
          <div>
            <Heading type="h1" class="mb-8 max-w-xl text-5xl color-brand-3 font-500 heading lg:text-7xl md:text-6xl">
              {{ headline }}
            </Heading>
          </div>
          <div class="mb-6 w-full">
            <h3 class="font-norma1 max-w-lg color-brand-3 font-500 p1">
              {{ description }}
            </h3>
          </div>
          <div v-if="action" class="mt-6 w-full">
            <Btn :href="action.href" :icon="action.icon">
              {{ action.text }}
            </Btn>
          </div>
        </div>
      </div>
      <div class="my-12 w-full">
        <NuxtImg
          class="ml-a max-w-140 w-full"
          alt="Storacha Illustration"
          src="/img/storacha-il.webp"
          width="800"
          height="908"
        />
      </div>
    </div>
  </div>
</template>
