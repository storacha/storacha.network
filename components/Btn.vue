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
};

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
    class="btn" :class="
      {
        'btn-primary': primary,
        'btn-secondary': secondary,
        'btn-outline': outline,
        'btn-slim': slim,
        'w-full block text-center': full,
      }"
    v-bind="forwardProps"
  >
    <div class="max-h-4 flex items-end justify-center gap-1 leading-none">
      <span v-if="icon" class="btn-icon inline-block v-middle" :class="icon" aria-hidden="true" />
      <span class="btn-text"><slot>{{ text }}</slot></span>
    </div>
  </AppLink>
</template>
