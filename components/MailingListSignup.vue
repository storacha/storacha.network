<script lang="ts" setup>
const { mailingList: { url, icon, label } } = useAppConfig()
</script>

<template>
  <Btn :href="url" :icon="icon">
    {{ label }}
  </Btn>
</template>
