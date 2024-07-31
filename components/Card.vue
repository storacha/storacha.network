<script lang="ts" setup>
interface CardProps {
  title?: string
  icon?: string
  inheritColor?: boolean
}
defineProps<CardProps>()
</script>

<template>
  <div class="card" :class="[{ inherit: inheritColor }]">
    <template v-if="title || icon">
      <slot name="header">
        <div class="card-header flex items-center justify-between">
          <Heading v-if="title" type="h6" class="uppercase">
            {{ title }}
          </Heading>
          <i v-if="icon" class="icon">{{ icon }}</i>
        </div>
      </slot>
      <div class="card-body">
        <slot />
      </div>
    </template>
  </div>
</template>

<style lang="postcss" scoped>
.card {
  @apply b-1 color-brand-3 b-brand-3 bg-white rounded-lg flex-inline flex-col min-h-50;
}
.card-body {
  @apply p-4 flex-grow color-current;
}
.card-header {
  @apply px-4 py-2 b-b-1 b-color-current;
}
.card.inherit {
  @apply color-current b-color-current;
}
</style>
