<script setup lang="ts">
import type { SectionHeaderProps } from './SectionHeader.vue'
import { useForwardProps } from 'radix-vue'

interface HeroProps extends SectionHeaderProps {}
const props = defineProps<HeroProps>()
const forwardProps = useForwardProps(reactiveOmit(props, ['description']))
</script>

<template>
  <HeroBase class="home min-h-100vh">
    <template #left>
      <SectionHeader v-bind="forwardProps" class="color-brand-3 !gap-10">
        <Heading type="h4" class="uppercase !text-balance">
          {{ description }}
        </Heading>
      </SectionHeader>
    </template>
    <template #right>
      <div class="flex items-center justify-center md:hidden">
        <div class="aspect-ratio-square overflow-clip b-5 b-brand-3 rounded-[40px]">
          <img class="h-full w-auto object-cover object-[63%_50%]" src="/img/hero/hero-fixed.webp" :alt="title" aria-hidden="true">
        </div>
      </div>
    </template>
  </HeroBase>
</template>
