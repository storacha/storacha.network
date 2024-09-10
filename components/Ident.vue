<script lang="ts" setup>
defineProps<{ siteName: string | undefined, invert?: boolean }>()
</script>

<template>
  <div class="ident transition-all">
    <img v-if="invert" src="/img/storacha-bug-invert.svg" :alt="siteName" class="h-full">
    <img v-else class="h-full" src="/img/storacha-bug.svg" :alt="siteName">
    <span class="hidden">{{ siteName }}</span>
  </div>
</template>
