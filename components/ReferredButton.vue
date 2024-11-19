<script setup lang="ts">
export interface ReferralCodeCreatorProps {
  referralsUrl: string
}
const route = useRoute()
const refcode = route.query.refcode
const consoleSignupUrl =  `${process.env.VUE_APP_CONSOLE_URL}?refcode=${refcode}`

</script>

<template>
  <div>
    <div class="prose p1 color-brand-3">
      <p>
        For the full rundown on how it all works, check out our <b><a href="TODOtoslink">Terms & Conditions</a></b>.
      </p>
    </div>
    <a :href="consoleSignupUrl" class="btn">Claim Your Discount</a>
  </div>
</template>
