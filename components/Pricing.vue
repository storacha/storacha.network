<script lang="ts" setup>

</script>

<template>
  <Section class="bg-brand-4" full-width padding>
    <template #bg>
      <div class="pricing-bg" />
    </template>
    <div class="grid-margins color-brand-3">
      <SectionHeader
        eyebrow="Find your plan"
        title="How h🔥t would you like it?"
        class="text-center"
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
          ]"
          :action="{ text: 'START STORING', href: '/' }"
        />
        <PricingCard
          tier="Medium"
          price="10"
          unit="mo"
          icon="🌶🌶"
          :features="[
            ['100GB Storage', 'Additional at $0.05/GB per month'],
            ['100GB egress', 'Additional at $0.05/GB per month '],
          ]"
          :action="{ text: 'START STORING', href: '/' }"
        />
        <PricingCard
          tier="Extra Spicy"
          price="100"
          unit="mo"
          icon="🌶🌶🌶"
          :features="[
            ['2TB Storage', 'Additional at $0.03/GB per month'],
            ['2TB egress', 'Additional at $0.03/GB per month'],
          ]"
          :action="{ text: 'START STORING', href: '/' }"
        />
      </div>
    </div>
  </Section>
</template>

<style lang="postcss" scoped>
.pricing-bg {
  background: url('/img/racha-pricing.webp') no-repeat left -3em bottom -9em / 1500px;
  @screen sm {
    background: url('/img/racha-pricing.webp') no-repeat bottom -10em left -6em / cover;
  }
}
</style>
