<script setup lang="ts">
interface Props {
  type?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6'
}
withDefaults(defineProps<Props>(), { type: 'h2' })
</script>

<template>
  <component :is="type" :class="type">
    <slot />
  </component>
</template>
