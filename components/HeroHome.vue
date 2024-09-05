<script setup lang="ts">
import { useForwardProps } from 'radix-vue'
import type { SectionHeaderProps } from './SectionHeader.vue'

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
  </HeroBase>
</template>
