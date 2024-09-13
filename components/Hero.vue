<script setup lang="ts">
import type { SectionHeaderProps } from './SectionHeader.vue'
import { useForwardProps } from 'radix-vue'

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
