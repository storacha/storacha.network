<script setup lang="ts">
export interface ReferralCodeCreatorProps {
  referralsUrl: string
}

const referralsUrl =  `${process.env.VUE_APP_CONSOLE_URL}/referrals`
</script>

<template>
  <div>
    <div class="prose p1 color-brand-3">
      <p>
        <b>Enter your email</b> and we will generate your unique referral code!
      </p>
    </div>
    <form :action="referralsUrl" method="GET" class="flex flex-row space-x-4">
      <input type="email" name="email" class="rounded-full px-4 w-96" placeholder="Email Address" />
      <input type="submit" value="Generate Code" class="btn " />
    </form>
  </div>
</template>
