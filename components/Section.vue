<script lang="ts" setup>
defineProps<{ fullWidth?: boolean, padding?: boolean }>()
</script>

<template>
  <section class="section" :class="{ 'with-padding': padding, 'with-bg': $slots.bg }">
    <SectionBackground v-if="$slots.bg" class="body">
      <slot name="bg" />
    </SectionBackground>
    <div class="body" :class="{ 'grid-margins': !fullWidth }">
      <slot />
    </div>
  </section>
</template>

<style lang="postcss" scoped>
section.with-padding {
  @apply section-py;
}
section.with-bg {
  @apply relative;
}
</style>
