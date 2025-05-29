<script setup lang="ts">
interface HeroProps {
  title: string
  eyebrow?: string
  description: string
}

defineProps<HeroProps>()
</script>

<template>
  <HeroBase class="home min-h-100vh">
    <template #left>
      <div class="section-header color-brand-3 !gap-10">
        <span v-if="eyebrow" class="text-2xl uppercase">
          {{ eyebrow }}
        </span>
        <Heading v-if="title" type="h1" class="max-w-22ch text-pretty font-medium">
          {{ title }}
        </Heading>
        <p class="text-2xl uppercase !text-balance">
          {{ description }}
        </p>
      </div>
    </template>
    <template #right>
      <div class="flex items-center justify-center md:hidden">
        <div class="aspect-ratio-square overflow-clip b-5 b-brand-3 rounded-[40px]">
          <img
            class="h-full w-auto object-cover object-[63%_50%]"
            src="/img/hero/hero-fixed.webp"
            :alt="title"
            aria-hidden="true"
          >
        </div>
      </div>
    </template>
  </HeroBase>
</template>

<style lang="postcss" scoped>
.section-header {
  @apply flex flex-col gap-6;
}
</style>
