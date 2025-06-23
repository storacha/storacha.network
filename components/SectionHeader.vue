<script lang="ts" setup>
import type { BtnProps } from './Btn.vue'
import Btn from './Btn.vue'

// Extended interface to allow any additional properties for component flexibility
interface ActionItem extends BtnProps {
  asComponent?: Component
  [key: string]: any // Allow any additional properties
}

export interface SectionHeaderProps {
  title: string
  center?: boolean
  eyebrow?: string
  description?: string
  actions?: ActionItem[]
}
defineProps<SectionHeaderProps>()
</script>

<template>
  <div class="section-header" :class="{ 'text-center': center }">
    <Heading v-if="eyebrow" type="h4" class="uppercase">
      {{ eyebrow }}
    </Heading>
    <Heading v-if="title" type="h1" class="max-w-22ch text-pretty font-medium" :class="{ 'mx-auto max-w-35ch': center }">
      {{ title }}
    </Heading>
    <p v-if="description" class="max-w-50ch text-pretty prose p1">
      {{ description }}
    </p>
    <slot />
    <div v-if="actions" class="flex flex-col gap-4 sm:flex-row sm:gap-4 px-4 sm:px-0" :class="{ 'justify-center': center }">
      <component
        :is="action.asComponent ? action.asComponent : Btn"
        v-for="action in actions"
        :key="action.text || Math.random()"
        v-bind="action"
        class="w-full sm:w-auto"
      />
    </div>
  </div>
</template>

<style lang="postcss" scoped>
.section-header {
  @apply flex flex-col gap-6;
}
</style>