<script lang="ts" setup>
defineProps<{
  iconClass?: string
}>()

const socialNetworks = useActions('socialNetworks')
</script>

<template>
  <div class="flex space-x-4">
    <div v-for="n in socialNetworks" :key="n.name">
      <AppLink :href="n.href" class="flex items-center justify-center transition" :class="iconClass">
        <div :class="n.icon" :title="`${n.description} on ${n.name}`" />
      </AppLink>
    </div>
  </div>
</template>