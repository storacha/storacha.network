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
      <div class="grid-margins">
        <div class="flex flex-col items-center justify-center gap-8 sm:flex-row">
          <Heading v-if="heading" type="h3" class="text-center color-brand-3 font-medium">
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
  background: url('/img/racha-footer.svg') no-repeat right -2rem bottom -1px / 500%;
}
.pre-footer {
  @apply pb-30 pt-5;
}
@screen sm {
  .pre-footer {
    @apply pb-50 pt-20;
  }
}
@screen sm {
  .pre-footer-bg {
    background-size: cover;
    background-position: bottom -1px right;
  }
}
@screen xl {
  .pre-footer {
    @apply pb-60;
  }
}
@screen 2xl {
  .pre-footer {
    @apply pb-90;
  }
  .pre-footer-bg {
    background-size: 3500px;
    background-position: bottom -1px right;
  }
}
</style>
