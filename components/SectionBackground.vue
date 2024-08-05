<template>
  <div class="section-bg pointer-events-none absolute inset-0 z-0" aria-hidden="true">
    <slot />
  </div>
</template>

<style lang="postcss" scoped>
/* set root bg to expand */
:deep(> div) {
  @apply h-full w-full;
}
</style>
