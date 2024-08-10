<script lang="ts" setup>
interface CarouselSection {
  title: string
  description: string
}
defineProps<CarouselSection>()
</script>

<template>
  <div class="carousel-section flex flex-col gap-8 sm:flex-row sm:gap-0">
    <div class="grid-margins lg:mr-4 lg:mt-12 sm:w-33% xl:pl-0">
      <Heading type="h2" class="font-medium">
        {{ title }}
      </Heading>
      <p class="mt-4 text-base p1">
        {{ description }}
      </p>
    </div>
    <Carousel>
      <slot />
    </Carousel>
  </div>
</template>

<style lang="postcss" scoped>
.carousel-section {
  margin-left: max(0rem, calc(100vw - 1280px)/2 + 1rem);
}
</style>
