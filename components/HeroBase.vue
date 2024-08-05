<template>
  <!-- hero -->
  <div id="hero" class="flex">
    <div class="w-full flex flex-col items-center justify-between sm:flex-row sm:gap-8">
      <div class="mt-50 flex items-center sm:mt-0">
        <div class="ml-a lg:max-w-220 sm:text-left">
          <slot name="left" />
        </div>
      </div>
      <div class="my-12 w-full">
        <slot name="right" />
      </div>
    </div>
  </div>
</template>
