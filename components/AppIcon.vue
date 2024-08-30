<script lang="ts" setup>
interface AppIconProps {
  i: string
}
defineProps<AppIconProps>()
</script>

<template>
  <div v-if="i.startsWith('i-')" class="icon inline v-middle" :class="i" />
  <div v-else class="icon inline v-middle">
    {{ i }}
  </div>
</template>

<style>

</style>
