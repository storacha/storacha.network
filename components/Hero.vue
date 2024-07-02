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
  <div id="hero-bg" class="min-h-100vh flex 2xl:min-h-200 md:min-h-100vh">
    <div class="w-full flex flex-col justify-center">
      <div>
        <h1 class="mb-8 max-w-xl text-5xl color-brand-3 font-500 heading lg:text-7xl md:text-6xl">
          {{ headline }}
        </h1>
      </div>
      <div class="mb-6">
        <h3 class="font-norma1 max-w-lg color-brand-3 font-500 p1">
          {{ description }}
        </h3>
      </div>
      <div v-if="action" class="mt-6">
        <Btn :href="action.href" :icon="action.icon">
          {{ action.text }}
        </Btn>
      </div>
    </div>
  </div>
</template>

<style lang="postcss">
@media (min-width: 640px) {
  #hero-bg {
    background-image: url('/img/storacha-il.png');
    background-size: 40%;
    background-repeat: no-repeat;
    background-position: 90% center;
  }
}
</style>
