<script setup lang="ts">
import { useForwardProps } from 'radix-vue'
import type { SectionHeaderProps } from './SectionHeader.vue'

interface HeroProps extends SectionHeaderProps {}
const props = withDefaults(defineProps<HeroProps>(), {})
const forwardProps = useForwardProps(props)
</script>

<template>
  <!-- hero -->
  <div id="hero-bg" class="min-h-100vh flex">
    <div class="w-full flex flex-col items-center justify-between sm:flex-row sm:gap-8">
      <div class="mt-50 flex items-center sm:mt-0 sm:min-h-100vh">
        <div class="ml-a flex flex-1 flex-col gap-12 lg:max-w-220 sm:text-left">
          <SectionHeader v-bind="forwardProps" class="color-brand-3 !gap-12" />
        </div>
      </div>
      <div class="my-12 w-full" />
    </div>
  </div>
</template>
