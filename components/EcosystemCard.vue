<script lang="ts" setup>
import { AvatarFallback, AvatarImage, AvatarRoot } from 'radix-vue'
import type { Ecosystem } from '~/types'

interface EcosystemCardProps {
  category?: Ecosystem.Category
}

defineProps<EcosystemCardProps>()
</script>

<template>
  <div
    class="relative aspect-ratio-video flex rounded-2xl bg-brand-1 p-4 text-white"
  >
    <CategoryPill v-if="category" class="absolute right-4 top-4">
      {{ category.icon }} {{ category.name }}
    </CategoryPill>
    <AvatarRoot class="bg-blackA3 h-[45px] w-[45px] inline-flex select-none items-center justify-center overflow-hidden rounded-full align-middle">
      <AvatarImage
        class="h-full w-full rounded-[inherit] object-cover"
        src="https://images.unsplash.com/photo-1492633423870-43d1cd2775eb?&w=128&h=128&dpr=2&q=80"
        alt="Colm Tuite"
      />
      <AvatarFallback
        class="text-grass11 h-full w-full flex items-center justify-center bg-white text-[15px] font-medium leading-1"
        :delay-ms="600"
      >
        CT
      </AvatarFallback>
    </AvatarRoot>
    <slot />
  </div>
</template>

<style>

</style>
