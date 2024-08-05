<script lang="ts" setup>
import type { BtnProps } from './Btn.vue'

export interface SectionHeaderProps {
  title: string
  center?: boolean
  eyebrow?: string
  description?: string
  actions?: BtnProps[] & { label: string }[]
}
defineProps<SectionHeaderProps>()
</script>

<template>
  <div class="section-header" :class="{ 'text-center': center }">
    <Heading type="h4" class="uppercase">
      {{ eyebrow }}
    </Heading>
    <Heading type="h1" class="max-w-5xl font-medium" :class="{ 'mx-a': center }">
      {{ title }}
    </Heading>
    <p class="prose h4">
      {{ description }}
    </p>
    <div class="flex flex-col gap-4 sm:flex-row" :class="{ 'justify-center': center }">
      <Btn
        v-for="action in actions"
        :key="action.label"
        v-bind="action"
      >
        {{ action.label }}
      </Btn>
    </div>
  </div>
</template>

<style lang="postcss" scoped>
.section-header {
  @apply flex flex-col gap-6;
}
</style>
