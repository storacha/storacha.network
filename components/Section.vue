<script lang="ts" setup>
defineProps<{ fullWidth?: boolean, padding?: boolean }>()
</script>

<template>
  <div :class="{ 'py-12': padding }">
    <div class="outer body" :class="{ 'grid-margins': !fullWidth }">
      <slot />
    </div>
  </div>
</template>

<style>

</style>
