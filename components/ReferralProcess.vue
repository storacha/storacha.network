<script lang="ts" setup>
const Steps = [
  {
    icon: '🔥',
    title: 'Share Your Referral Link',
    description: `Enter your email and we'll generate your unique referral code. Once your referees have successfully signed up, they can choose between <b>2 months</b> of <b>Lite</b> or <b>1 month</b> of <b>Business</b> for free!`,
  },
  {
    icon: '🔥🔥',
    title: 'They Become a Full Racha',
    description: `If your friend starts paying for <b>Lite</b> for <b>2 more months</b> or <b>Business</b> for <b>1 more month</b> beyond their free trial, you'll earn your reward.`,
  },
  {
    icon: '🔥🔥🔥',
    title: 'Your Receive Your Reward',
    description: `For each referral you <b>earn Storage Credits</b> (20 for Lite, 100 for Business) and <b>Racha Points</b> (20 for Lite, 100 for Business), to contribute towards your storage subscription.`,
  }
]
</script>

<template>
  <div class="grid grid-cols-1 gap-12 lg:grid-cols-4 sm:grid-cols-2">
    <div
      v-for="{ icon, title, description } in Steps"
      :key="title"
      class="grid row-span-3 grid-rows-subgrid gap-4"
    >
      <div class="h3">
        {{ icon }}
      </div>
      <Heading type="h3" class="uppercase">
        {{ title }}
      </Heading>
      <p class="p1" v-html="description"></p>
    </div>
  </div>
</template>

<style>

</style>
