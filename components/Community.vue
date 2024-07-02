<script lang="ts" setup>

</script>

<template>
  <div class="grid grid-cols-1 box-border gap-0 md:grid-cols-2">
    <div class="bg-brand-1 p-6 md:p-12">
      <div class="s-block-inner s-block bg-brand-4 sm:float-right">
        <Heading type="h3">
          Join the Community
        </Heading>
        <div v-for="i in 5" :key="i">
          {{ i }}
        </div>
      </div>
    </div>
    <div class="community-img s-block box-border">
      <div class="s-block-inner h-full border-2">
        <div class="flex flex-col justify-center">
          <Heading type="h3">
            Join the Community
          </Heading>
          <div v-for="i in 5" :key="i">
            {{ i }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="postcss">
.s-block {
  @apply h-full max-w-3xl w-full p-6 md:p-12;
}
.s-block-inner {
  @apply rounded-3xl p-6 md:p-12;
}
.community-img {
  background-image: url('/img/community-bg.webp');
  background-size: cover;
  background-position: center;
}
</style>
