<script lang="ts" setup>
defineProps<{ fullWidth?: boolean, padding?: boolean }>()
</script>

<template>
  <div :class="{ 'section-padding': padding }">
    <div class="outer body" :class="{ 'grid-margins': !fullWidth }">
      <slot />
    </div>
  </div>
</template>

<style lang="postcss">
.section-padding {
  @apply py-6 py-8 lg:py-12
}
</style>
