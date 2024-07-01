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
    <div class="flex items-center gap-1">
      <span v-if="icon" class="mr-1 inline-block h-4 w-4" :class="icon" aria-hidden="true" /><slot />
    </div>
  </AppLink>
</template>
