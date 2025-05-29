<script lang="ts" setup>
import type { BtnProps } from './Btn.vue'

interface PricingCardProps {
  tier: 'Mild' | 'Medium' | 'Extra Spicy'
  price: string
  features: [string, string?][]
  unit: 'mo' | 'yr'
  icon: string
  currency?: '$' | '€' | '£'
  action?: BtnProps
  ribbon?: string
}

const { currency = '$' } = defineProps<PricingCardProps>()
</script>

<template>
  <Card :title="tier" :icon="icon" inherit-color :ribbon="ribbon">
    <div class="pricing-inner flex flex-col gap-8">
      <Heading type="h2" class="font-medium">
        {{ currency }}{{ price }}/{{ unit }}
      </Heading>
      <ul class="flex flex-col gap-4">
        <li v-for="[feat, desc], i in features" :key="i">
          <Heading type="h3">
            {{ feat }}
          </Heading>
          <p v-if="desc" class="text-sm font-sans">
            {{ desc }}
          </p>
        </li>
      </ul>
      <div class="pricing-actions">
        <Btn v-if="action" v-bind="action" />
      </div>
    </div>
  </Card>
</template>
