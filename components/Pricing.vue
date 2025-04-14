<script setup lang="ts">
const start = useActions('start')
</script>

<template>
  <Section id="pricing" class="overflow-clip bg-brand-4" padding>
    <template #bg>
      <div class="grid-margins">
        <img class="racha-pricing" src="/img/hero/racha.svg" alt="" aria-hidden="true" t-skip>
      </div>
    </template>
    <div class="color-brand-3">
      <SectionHeader
        eyebrow="Find your plan"
        title="How h🔥t would you like it?"
        center
      />
      <div class="grid grid-cols-1 mb-50 mt-12 gap-4 sm:grid-cols-3">
        <PricingCard
          tier="Mild"
          price="0"
          unit="mo"
          icon="🌶"
          :features="[
            ['5GB Storage', 'Additional at $0.15/GB per month'],
            ['5GB egress', 'Additional at $0.15/GB per month'],
            ['Support over Email & in Discord'],
          ]"
          :action="start"
        />
        <PricingCard
          tier="Medium"
          price="10"
          unit="mo"
          icon="🌶🌶"
          :features="[
            ['100GB Storage', 'Additional at $0.05/GB per month'],
            ['100GB egress', 'Additional at $0.05/GB per month '],
            ['Support over Email & in Discord'],
          ]"
          :action="start"
        />
        <PricingCard
          tier="Extra Spicy"
          price="100"
          unit="mo"
          icon="🌶🌶🌶"
          :features="[
            ['2TB Storage', 'Additional at $0.03/GB per month'],
            ['2TB egress', 'Additional at $0.03/GB per month'],
            ['Dedicated Support Channel'],
          ]"
          :action="start"
          ribbon="🔥 Best Value 🔥 Best Value"
        />
      </div>
    </div>
  </Section>
</template>

<style lang="postcss" scoped>
.racha-pricing {
  position: absolute;
  bottom: 0;
  transform-origin: bottom left;
  transform: scaleX(-1) rotate(-65deg) translateX(-60%) translateY(4%);
}
</style>
