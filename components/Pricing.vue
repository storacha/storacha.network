<script lang="ts" setup>

</script>

<template>
  <Section class="bg-brand-4" full-width padding>
    <div class="grid-margins">
      <SectionHeader
        eyebrow="Find your plan"
        title="How h🔥t would you like it?"
        class="text-center color-brand-3"
      />
      <div class="grid grid-cols-1 gap-4 lg:grid-cols-3 sm:grid-cols-2">
        <PricingCard
          title="Mild"
          price="0"
          unit="mo"
          :features="[
            '5GB Storage',
            'Additional at $0.15/GB per month',
            '5GB egress',
            'Additional at $0.15/GB per month',
          ]"
          action="START STORING"
        />
        <PricingCard
          title="Medium"
          price="10"
          unit="mo"
          :features="[
            '100GB Storage',
            'Additional at $0.05/GB per month',
            '100GB egress',
            'Additional at $0.05/GB per month ',
          ]"
          action="START STORING"
        />
        <PricingCard
          title="Extra Spicy"
          price="100"
          unit="mo"
          :features="[
            '2TB Storage',
            'Additional at $0.03/GB per month',
            '2TB egress',
            'Additional at $0.03/GB per month',
          ]"
          action="START STORING"
        />
      </div>
    </div>
  </Section>
</template>

<style>

</style>
