<template>
  <!-- hero -->
  <div id="hero" class="flex overflow-hidden">
    <div class="w-full max-w-full flex flex-col items-center justify-between gap-6 sm:flex-row sm:gap-8">
      <div class="mt-50 flex items-center sm:mt-0 w-full sm:w-auto">
        <div class="w-full max-w-full sm:ml-a lg:max-w-220 sm:text-left">
          <slot name="left" />
        </div>
      </div>
      <div class="my-8 sm:my-12 w-full max-w-full">
        <slot name="right" />
      </div>
    </div>
  </div>
</template>