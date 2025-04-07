<script lang="ts" setup>
interface GridSectionProps {
  title: string
  description: string
}
defineProps<GridSectionProps>()
</script>

<template>
  <section class="grid-margins flex flex-col gap-8">
    <div class="lg:w-1/2 md:w-2/3">
      <Heading type="h2" class="font-medium">
        {{ title }}
      </Heading>
      <p class="mt-4 text-base p1">
        {{ description }}
      </p>
    </div>
    <GridLayout>
      <slot />
    </GridLayout>
  </section>
</template>
