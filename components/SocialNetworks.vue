<script lang="ts" setup>
defineProps<{
  iconClass?: string
}>()

const socialNetworks = useActions('socialNetworks')
</script>

<template>
  <div class="h-fit flex flex-wrap justify-center gap-4">
    <div v-for="n in socialNetworks" :key="n.name">
      <AppLink
        :href="n.href"
        class="min-h-[48px] min-w-[48px] flex items-center justify-center p-2 transition"
        :class="iconClass"
      >
        <div :class="n.icon" :title="`${n.description} on ${n.name}`" />
      </AppLink>
    </div>
  </div>
</template>
