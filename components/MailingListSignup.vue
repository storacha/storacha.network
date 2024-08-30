<script lang="ts" setup>
const { mailingList: { url, icon, text } } = useAppConfig()
</script>

<template>
  <Btn :href="url" :icon="icon" :text="text" />
</template>
