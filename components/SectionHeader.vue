<script lang="ts" setup>
import type { BtnProps } from './Btn.vue'
import Btn from './Btn.vue'

export interface SectionHeaderProps {
  title: string
  center?: boolean
  eyebrow?: string
  description?: string
  actions?: BtnProps[] & { asComponent?: Component }[]
}
defineProps<SectionHeaderProps>()
</script>

<template>
  <div class="section-header" :class="{ 'text-center': center }">
    <span v-if="eyebrow" class="text-2xl uppercase">
      {{ eyebrow }}
    </span>
    <Heading v-if="title" type="h2" class="max-w-22ch text-pretty font-medium" :class="{ 'mx-a max-w-35ch': center }">
      {{ title }}
    </Heading>
    <p v-if="description" class="max-w-50ch text-pretty prose p1">
      {{ description }}
    </p>
    <slot />
    <div v-if="actions" class="flex flex-col gap-4 sm:flex-row" :class="{ 'justify-center': center }">
      <component
        :is="action.asComponent ? action.asComponent : Btn"
        v-for="action in actions"
        :key="action.text"
        v-bind="action"
      />
    </div>
  </div>
</template>

<style lang="postcss" scoped>
.section-header {
  @apply flex flex-col gap-6;
}
</style>
