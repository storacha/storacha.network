<script lang="ts" setup>
import { AvatarFallback, AvatarImage, AvatarRoot } from 'radix-vue'
import type { Ecosystem } from '~/types'

interface EcosystemCardProps {
  title: string
  description: string
  category?: Ecosystem.Category
  action?: {
    text: string
    href: string
  }
}

defineProps<EcosystemCardProps>()
</script>

<template>
  <div
    class="relative aspect-ratio-video flex flex-col gap-4 overflow-hidden rounded-2xl bg-brand-1 p-4 text-white [&:hover>.back]:opacity-100"
  >
    <CategoryPill v-if="category" class="absolute right-4 top-4">
      {{ category.icon }} {{ category.name }}
    </CategoryPill>
    <div class="avatar mt-a">
      <AvatarRoot class="h-[45px] w-[45px] inline-flex select-none items-center justify-center overflow-hidden rounded-full align-middle">
        <AvatarImage
          class="h-full w-full rounded-[inherit] object-cover"
          src="https://images.unsplash.com/photo-1492633423870-43d1cd2775eb?&w=128&h=128&dpr=2&q=80"
          alt="Colm Tuite"
        />
        <AvatarFallback
          class="h-full w-full flex items-center justify-center bg-white text-[15px] font-medium leading-1"
          :delay-ms="600"
        >
          CT
        </AvatarFallback>
      </AvatarRoot>
    </div>
    <Heading type="h4">
      {{ title }}
    </Heading>
    <div v-if="description" class="flex items-center gap-1 lh-none">
      Read More<Icon i="i-carbon:arrow-right" />
    </div>
    <AppLink :href="action?.href" class="back absolute inset-0 flex flex-col p-4 opacity-0 backdrop-blur-xl transition-all">
      <div class="flex grow">
        {{ description }}
      </div>
      <div v-if="action" class="flex items-center gap-1 lh-none">
        {{ action.text }}<Icon i="i-carbon:arrow-up-right" />
      </div>
    </AppLink>
    <slot />
  </div>
</template>

<style>

</style>
