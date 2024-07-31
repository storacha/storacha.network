<script lang="ts" setup>
import type { BtnProps } from './Btn.vue'

interface PricingCardProps {
  tier: 'Mild' | 'Medium' | 'Extra Spicy'
  price: string
  features: [string, string?][]
  unit: 'mo' | 'yr'
  icon: string
  currency: '$' | '€' | '£'
  action?: BtnProps
}

withDefaults(defineProps<PricingCardProps>(), {
  currency: '$',
})
</script>

<template>
  <Card :title="tier" :icon="icon" inherit-color>
    <div class="pricing-inner flex flex-col gap-8">
      <Heading type="h1" class="font-medium">
        {{ currency }}{{ price }}/{{ unit }}
      </Heading>
      <ul class="flex flex-col gap-4">
        <li v-for="[feat, desc], i in features" :key="i">
          <Heading type="h5">
            {{ feat }}
          </Heading>
          <p v-if="desc" class="text-sm color-brand-3">
            {{ desc }}
          </p>
        </li>
      </ul>
      <div class="pricing-actions">
        <Btn v-bind="action" />
      </div>
    </div>
  </Card>
</template>
