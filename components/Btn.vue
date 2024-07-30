<script setup lang="ts">
import type { AppLinkProps } from './AppLink.vue'

export interface BtnProps extends AppLinkProps {
  primary?: boolean
  outline?: boolean
  full?: boolean
  icon?: string
  slim?: boolean
};

const props = withDefaults(
  defineProps<BtnProps>(),
  {
    prefetch: undefined,
    noPrefetch: undefined,
    noRel: undefined,
    replace: undefined,
    external: undefined,
    custom: undefined,
  },
)

// destruct the link props and keep them reactive
const linkProps = computed(() => {
  const { primary, outline, full, icon, slim, ...rest } = props
  return rest
})
</script>

<template>
  <AppLink
    class="btn" :class="
      {
        'btn-primary': primary,
        'btn-outline': outline,
        'btn-slim': slim,
        'w-full block text-center': full,
      }"
    v-bind="linkProps"
  >
    <div class="flex items-end gap-2 leading-none">
      <span v-if="icon" class="inline-block" :class="icon" aria-hidden="true" /><slot />
    </div>
  </AppLink>
</template>
