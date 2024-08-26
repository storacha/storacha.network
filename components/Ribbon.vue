<script lang="ts" setup>
</script>

<template>
  <div class="ribbon ribbon-top-right">
    <span class="text-white font-semibold font-mono"><slot /></span>
  </div>
</template>

<style lang="postcss" scoped>
.ribbon {
  --default-color: theme('colors.brand.3');
  width: 170px;
  height: 170px;
  overflow: hidden;
  position: absolute;
  z-index: 1;
}
.ribbon::before,
.ribbon::after {
  position: absolute;
  z-index: -1;
  content: '';
  display: block;
  border: 5px solid hsl(from var(--default-color) h s 40);
}
.ribbon span {
  position: absolute;
  display: block;
  width: 280px;
  padding: 16px 0;
  background-color: var(--default-color);
  box-shadow: 0 5px 10px rgba(0,0,0,0.1);
  line-height: 1rem;
  text-transform: uppercase;
  text-align: center;
}
.ribbon-top-right {
  top: -10px;
  right: -10px;
}
.ribbon-top-right::before,
.ribbon-top-right::after {
  border-top-color: transparent;
  border-right-color: transparent;
}
.ribbon-top-right::before {
  top: 0;
  left: 0;
}
.ribbon-top-right::after {
  bottom: 0;
  right: 0;
}
.ribbon-top-right span {
  left: -40px;
  top: 42px;
  transform: rotate(45deg);
}
</style>
