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
      class="h-full md:max-w-160"
      :class="[bg?.inner, { 'section-py px-6 lg:px-7.5': padding }]"
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
