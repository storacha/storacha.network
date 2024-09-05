<script setup lang="ts">
import { useForwardProps } from 'radix-vue'
import type { SectionHeaderProps } from './SectionHeader.vue'

interface HeroProps extends SectionHeaderProps {}
const props = defineProps<HeroProps>()
const forwardProps = useForwardProps(props)
</script>

<template>
  <HeroBase>
    <template #left>
      <SectionHeader v-bind="forwardProps" class="color-brand-3" />
    </template>
  </HeroBase>
</template>
