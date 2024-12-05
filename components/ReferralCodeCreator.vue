<script setup lang="ts">
export interface ReferralCodeCreatorProps {
  referralsUrl: string
}

const config = useRuntimeConfig()
const referralsUrl = `${config.public.consoleUrl}/referrals`
</script>

<template>
  <form :action="referralsUrl" method="GET" class="flex flex-row space-x-2">
    <input type="email" name="email" class="w-96 rounded-full px-4" placeholder="Email Address">
    <input type="submit" value="Generate Code" class="btn">
  </form>
</template>
