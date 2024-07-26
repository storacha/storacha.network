<script setup lang="ts">
interface Props {
  primary?: boolean
  outline?: boolean
  full?: boolean
  icon?: string
  slim?: boolean
}
defineProps<Props>()
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
  >
    <div class="flex items-end gap-2 leading-none">
      <span v-if="icon" class="inline-block" :class="icon" aria-hidden="true" /><slot />
    </div>
  </AppLink>
</template>
