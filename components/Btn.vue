<script setup lang="ts">
import type { AppLinkProps } from './AppLink.vue'
import { useForwardProps } from 'radix-vue'

export interface BtnProps extends AppLinkProps {
  primary?: boolean
  secondary?: boolean
  outline?: boolean
  full?: boolean
  icon?: string
  slim?: boolean
  text?: string
}

const props = defineProps<BtnProps>()

const forwardProps = useForwardProps(reactiveOmit(props, [
  'primary',
  'secondary',
  'outline',
  'full',
  'icon',
  'slim',
]))
</script>

<template>
  <AppLink
    class="btn" 
    :class="{
      'btn-primary': primary,
      'btn-secondary': secondary,
      'btn-outline': outline,
      'btn-slim': slim,
      'w-full': full,
    }"
    v-bind="forwardProps"
  >
    <span class="flex items-center justify-center gap-2 min-h-full w-full">
      <span v-if="icon" class="btn-icon flex-shrink-0" :class="icon" aria-hidden="true" />
      <span class="btn-text whitespace-nowrap">
        <slot>{{ text }}</slot>
      </span>
    </span>
  </AppLink>
</template>