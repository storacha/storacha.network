<script lang="ts" setup>
defineProps<{ siteName: string | undefined, invert?: boolean }>()
</script>

<template>
  <Heading type="h4">
    <img v-if="invert" src="/img/storacha-bug.svg" :alt="siteName" class="max-h-full">
    <img else src="/img/storacha-bug.svg" :alt="siteName" class="max-h-full max-w-40 sm:max-w-50">
    <span class="hidden">{{ siteName }}</span>
  </Heading>
</template>
