<script lang="ts" setup>
interface SplitCellProps {
  bg?: {
    outer?: string
    inner?: string
  }
  padding?: boolean
}
defineProps<SplitCellProps>()
</script>

<template>
  <div class="split-cell" :class="bg?.outer">
    <div
      class="h-full flex items-center md:aspect-ratio-square md:max-w-160"
      :class="[bg?.inner, { 'py-12 px-6 md:p-12': padding }]"
    >
      <slot />
    </div>
  </div>
</template>

<style lang="postcss">
.split-cell > div {
  margin-left: auto;
}
.split-cell + .split-cell > div {
  margin-right: auto;
  margin-left: 0;
}
</style>
