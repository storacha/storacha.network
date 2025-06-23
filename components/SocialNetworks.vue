<script lang="ts" setup>
defineProps<{
  iconClass?: string
}>()

const socialNetworks = useActions('socialNetworks')
</script>

<template>
  <div class="flex flex-wrap justify-center gap-2 sm:gap-4 sm:space-x-0">
    <div v-for="n in socialNetworks" :key="n.name">
      <AppLink 
        :href="n.href" 
        class="flex items-center justify-center transition w-8 h-8 sm:w-auto sm:h-auto" 
        :class="iconClass"
      >
        <div 
          :class="[n.icon, 'text-lg sm:text-2xl max-w-full max-h-full']" 
          :title="`${n.description} on ${n.name}`" 
        />
      </AppLink>
    </div>
  </div>
</template>