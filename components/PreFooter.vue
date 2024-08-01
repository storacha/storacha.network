<script lang="ts" setup>
import type { BtnProps } from './Btn.vue'

interface Props {
  heading?: string
  cta?: {
    text: string
  } & BtnProps
}
defineProps<Props>()
</script>

<template>
  <Section>
    <template #bg>
      <div class="pre-footer-bg" />
    </template>

    <div class="pre-footer">
      <div class="grid-margins py-20 sm:(pb-50 pt-30)">
        <div class="flex flex-col items-center justify-center gap-8 sm:flex-row">
          <Heading v-if="heading" type="h3" class="color-brand-3 font-medium">
            {{ heading }}
          </Heading>
          <Btn v-if="cta" v-bind="cta">
            {{ cta.text }}
          </Btn>
        </div>
      </div>
    </div>
  </Section>
</template>

<style lang="postcss" scoped>
.pre-footer-bg {
  background: url('/img/racha-footer.svg') no-repeat right bottom -2px / cover;
  @screen lg {
    background-size: 150%;
    background-position: bottom -10px right;
  }
}
</style>
