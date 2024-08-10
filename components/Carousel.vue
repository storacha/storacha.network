<script lang="ts" setup>
const isDragging = ref(false)
const cursorPos = ref([0, 0])
const el = ref<Element>()

function onMouseDown(ev: MouseEvent) {
  isDragging.value = true
  cursorPos.value = [ev.clientX, ev.clientY]
  window.addEventListener('mousemove', onMouseHold)
}

function onMouseUp() {
  window.removeEventListener('mousemove', onMouseHold)
  isDragging.value = false
}

function onMouseHold(ev: MouseEvent) {
  ev.preventDefault()

  requestAnimationFrame(() => {
    const delta = [
      ev.pageX - cursorPos.value[0],
      ev.pageY - cursorPos.value[1],
    ]

    cursorPos.value = [ev.pageX, ev.pageY]

    if (el.value) {
      el.value.scrollBy({
        left: -delta[0],
        top: -delta[1],
      })
    }
  })
}
// register the event listener onMounted (cleanup is automatically handled)
useEventListener(el, 'mouseup', onMouseUp)
</script>

<template>
  <div
    ref="el"
    class="carousel" :style="{
      cursor: isDragging ? 'grabbing' : 'grab',
      scrollSnapType: isDragging ? '' : '',
    }"
    :class="{ 'is-dragging': isDragging }"
    @mousedown="onMouseDown"
    @mouseup="onMouseUp"
  >
    <slot />
  </div>
</template>

<style lang="postcss" scoped>
.carousel {
  display: grid;
  grid-auto-columns: calc(100% - 2rem);
  grid-column-gap: 1rem;
  grid-auto-flow: column;
  list-style: none;
  overflow-x: scroll;
  width: 100%;
  padding-left: 1rem;
  padding-right: 1rem;
}

:slotted(.card) {
  display: flex;
  flex-direction: column;
  scroll-snap-align: center;
  transition: all 0.2s;
  margin-bottom: 1rem;
}

.carousel::-webkit-scrollbar {
  height: 0.5rem;
}

.carousel::-webkit-scrollbar-thumb,
.carousel::-webkit-scrollbar-track {
  @apply rounded-3xl;
}

.carousel.is-dragging {
  user-select: none;
}

@media (hover: none) {
  :slotted(.card) {
    margin: 0;
  }
  .carousel {
    scroll-snap-type: x mandatory;
  }
  .carousel::-webkit-scrollbar {
    display: none;
  }
}

@media (min-width: 1024px) {
  :slotted(.card) {
    scroll-snap-align: start;
  }
  .carousel {
    grid-auto-columns: calc(55% - 5rem);
    grid-column-gap: 1.5rem;
  }
}
</style>
