<script lang="ts" setup>
const { mailingList } = useAppConfig()
</script>

<template>
  <Btn :href="mailingList.url" :icon="mailingList.icon">
    {{ mailingList.label }}
  </Btn>
</template>
