<script setup lang="ts">
export interface ReferralCodeCreatorProps {
  referralsUrl: string
}

const config = useRuntimeConfig()
const referralsUrl = `${config.public.consoleUrl}/referrals`
</script>

<template>
  <div>
    <div class="color-brand-3 prose p1">
      <p>
        <b>Enter your email</b> and we will generate your unique referral code!
      </p>
    </div>
    <form :action="referralsUrl" method="GET" class="flex flex-row space-x-4">
      <input type="email" name="email" class="w-96 rounded-full px-4" placeholder="Email Address">
      <input type="submit" value="Generate Code" class="btn">
    </form>
  </div>
</template>
