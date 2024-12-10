<script lang="ts" setup>
const Steps = [
  {
    icon: '🔥',
    title: 'Share Your Referral Link',
    description: `Enter your email and we'll generate your unique referral code. Once your referees have successfully signed up, they can choose between <b>2 months</b> of <b>Lite/Medium</b> or <b>1 month</b> of <b>Business/Extra Spicy</b> for free!`,
  },
  {
    icon: '🔥🔥',
    title: 'They Become a Full Racha',
    description: `If your friend starts paying for <b>Lite/Medium</b> for <b>2 more months</b> or <b>Business/Extra Spicy</b> for <b>1 more month</b> beyond their free trial, you'll be eligble for your Racha Points and Storage Credits.`,
  },
  {
    icon: '🔥🔥🔥',
    title: 'Your Receive Your Reward',
    description: `For each referral, you can earn <b>Storage Credits</b> and <b>Racha Points</b>. You need to have a Storacha account to claim your rewards. You can apply your Storage Credits to your Lite/Medium or Business/Extra Spicy subscriptions.`,
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
