<script lang="ts" setup>
import type { BtnProps } from './Btn.vue'

interface Props {
  title: string
  eyebrow?: string
  description?: string
  actions?: BtnProps[] & { label: string }[]
}
defineProps<Props>()
</script>

<template>
  <div class="flex flex-col gap-4">
    <Heading type="h4" class="uppercase">
      {{ eyebrow }}
    </Heading>
    <Heading type="h1" class="font-medium">
      {{ title }}
    </Heading>
    <p class="prose">
      {{ description }}
    </p>
    <div class="flex flex-col gap-4 sm:flex-row">
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

<style>

</style>
