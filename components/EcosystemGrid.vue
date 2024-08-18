<script lang="ts" setup>

</script>

<template>
  <div class="grid grid-cols-1 w-full gap-4 md:grid-cols-3">
    <EcosystemCard
      v-for="i in 3" :key="i"
    >
      {{ i }}
    </EcosystemCard>
  </div>
</template>

<style>

</style>
