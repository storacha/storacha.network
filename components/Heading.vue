<script setup lang="ts">
interface Props {
  type?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6'
}
const { type = 'h2' } = defineProps<Props>()
</script>

<template>
  <component :is="type" :class="type" class="text-pretty">
    <slot />
  </component>
</template>
