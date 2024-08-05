<script setup lang="ts">
import { useForwardProps } from 'radix-vue'
import type { AppLinkProps } from './AppLink.vue'

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
    <div class="flex items-end gap-2 leading-none">
      <span v-if="icon" class="inline-block" :class="icon" aria-hidden="true" /><slot>{{ text }}</slot>
    </div>
  </AppLink>
</template>
