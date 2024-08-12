<script lang="ts" setup>
defineProps<{ siteName: string | undefined, invert?: boolean }>()
</script>

<template>
  <Heading type="h4" class="ident transition-all">
    <img v-if="invert" src="/img/storacha-bug.svg" :alt="siteName" class="h-full w-full">
    <img v-else src="/img/storacha-bug.svg" :alt="siteName" class="h-full w-full">
    <span class="hidden">{{ siteName }}</span>
  </Heading>
</template>
