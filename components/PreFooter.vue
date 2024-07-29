<script lang="ts" setup>
interface Props {
  heading?: string
  cta?: {
    text: string
    href: string
  }
}
defineProps<Props>()
</script>

<template>
  <div class="pre-footer min-h-">
    <div class="grid-margins">
      <div class="flex flex-col items-center justify-center gap-8 sm:flex-row">
        <Heading v-if="heading" type="h4">
          {{ heading }}
        </Heading><AppLink v-if="cta" :href="cta.href">
          {{ cta.text }}
        </AppLink>
      </div>
    </div>
  </div>
</template>

<style lang="postcss" scoped>

</style>
