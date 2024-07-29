<script lang="ts" setup>
defineProps<{ fullWidth?: boolean, padding?: boolean }>()
</script>

<template>
  <section class="section" :class="{ 'with-padding': padding, 'with-bg': $slots.bg }">
    <slot name="outer" />

    <div v-if="$slots.bg" class="with-bg pointer-events-none absolute inset-0 z-0" aria-hidden="true">
      <slot name="bg" />
    </div>

    <div class="outer body" :class="{ 'grid-margins': !fullWidth }">
      <slot />
    </div>
  </section>
</template>

<style lang="postcss" scoped>
section.with-padding {
  @apply py-6 py-8 lg:py-12;
}
section.with-bg {
  @apply relative;
  .body {
    @apply relative;
  }
}
/* set root bg to expand */
.with-bg:slotted(> div) {
  @apply h-full w-full;
}
</style>
