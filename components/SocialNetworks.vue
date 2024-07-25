<script lang="ts" setup>
const { socialNetworks } = useAppConfig()
</script>

<template>
  <div class="flex gap-4">
    <div v-for="n in socialNetworks" :key="n.name">
      <a class="h-10 w-10" :href="n.url" target="_blank" rel="noopener noreferrer">
        <div :class="n.icon" :title="`${n.description} on ${n.name}`" />
      </a>
    </div>
  </div>
</template>
