<template>
  <div class="grid-layout">
    <slot />
  </div>
</template>

<style lang="postcss" scoped>
.grid-layout {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
  gap: 1rem;
  width: 100%;
}

:slotted(.card) {
  display: flex;
  flex-direction: column;
  margin-bottom: 1rem;
}

@media (min-width: 1024px) {
  .grid-layout {
    gap: 1.5rem;
  }
}
</style>
