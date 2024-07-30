<script lang="ts" setup>
interface PricingCardProps {
  title: string
  description?: string
  price: string
  features: string[]
  unit: 'mo' | 'yr'
}

defineProps<PricingCardProps>()
</script>

<template>
  <div>
    <h2>{{ title }}</h2>
    <p>{{ description }}</p>
    <p>{{ price }}</p>
    <ul>
      <li v-for="feature in features" :key="feature">
        {{ feature }}
      </li>
    </ul>
  </div>
</template>

<style>

</style>
