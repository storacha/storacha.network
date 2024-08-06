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
  <div class="split-frame" :class="bg?.outer">
    <div class="h-full md:max-w-160" :class="[bg?.inner, { 'p-12 px-6': padding }]">
      <slot />
    </div>
  </div>
</template>

<style lang="postcss">
.split-frame > div {
  margin-left: auto;
}
.split-frame + .split-frame > div {
  margin-right: auto;
  margin-left: 0;
}
</style>
