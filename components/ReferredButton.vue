<script setup lang="ts">
export interface ReferralCodeCreatorProps {
  referralsUrl: string
}
const route = useRoute()
const config = useRuntimeConfig()
const refcode = route.query.refcode
const consoleSignupUrl = `${config.public.consoleUrl}?refcode=${refcode}`
</script>

<template>
  <div>
    <div class="color-brand-3 prose p1">
      <p>
        For the full rundown on how it all works, check out our <b><a href="TODOtoslink">Terms & Conditions</a></b>.
      </p>
    </div>
    <a :href="consoleSignupUrl" class="btn">Claim Your Discount</a>
  </div>
</template>
