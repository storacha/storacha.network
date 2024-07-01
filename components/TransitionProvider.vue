<script lang="ts" setup>
const targets = ref([])
const root = ref()
const isSetup = ref(false)
const stopIntersectionObserver = ref(() => {})

onMounted(() => {
  if (root.value) {
    targets.value = Array.from(root.value.querySelectorAll('.body > *'))

    setTimeout(() => {
      const { stop } = useIntersectionObserver(
        targets,
        (entries, observerElement) => {
          entries.forEach(({ isIntersecting, target }, i) => {
            if (isIntersecting) {
              target.classList.remove('opacity-0')
              target.classList.add('animate-slide-enter')
              if (isSetup.value)
                observerElement.unobserve(target)
            }
            else {
              target.classList.add('opacity-0')
            }
            if (!isSetup.value && i === entries.length - 1)
              isSetup.value = true
          })
        },
        {
          threshold: window.innerWidth > 640 ? 0.25 : 0.1,
        },
      )
      stopIntersectionObserver.value = stop
    }, 30)

    onUnmounted(() => {
      // cleanup
      stopIntersectionObserver.value()
    })
  }
})
</script>

<template>
  <div ref="root" class="t-root" :class="{ 't-setup': isSetup }">
    <slot />
  </div>
</template>

<style lang="postcss">
.t-root:not(.t-setup) .body > * {
  opacity: 0;
}

@keyframes slide-enter {
  0% {
    opacity: 0;
    transform: translateY(10px);
  }

  to {
    opacity: 1;
    transform: none;
  }
}

.t-setup .animate-slide-enter > * {
  --stagger: 0;
  --delay: 150ms;
  --start: 0ms;
  animation: slide-enter 1s both 1;
  animation-delay: calc(var(--start) + var(--stagger) * var(--delay));
}

.animate-slide-enter > *:nth-child(1) { --stagger: 1; }
.animate-slide-enter > *:nth-child(2) { --stagger: 2; }
.animate-slide-enter > *:nth-child(3) { --stagger: 3; }
.animate-slide-enter > *:nth-child(4) { --stagger: 4; }
.animate-slide-enter > *:nth-child(5) { --stagger: 5; }
.animate-slide-enter > *:nth-child(6) { --stagger: 6; }
.animate-slide-enter > *:nth-child(7) { --stagger: 7; }
.animate-slide-enter > *:nth-child(8) { --stagger: 8; }
.animate-slide-enter > *:nth-child(9) { --stagger: 9; }
.animate-slide-enter > *:nth-child(10) { --stagger: 10; }
</style>
