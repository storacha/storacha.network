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
  <div>
    <Heading type="h5" class="uppercase">
      {{ eyebrow }}
    </Heading>
    <Heading type="h2">
      {{ title }}
    </Heading>
    <p class="prose">
      {{ description }}
    </p>
    <div>
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
