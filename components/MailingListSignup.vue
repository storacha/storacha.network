<script lang="ts" setup>
const mailingList = useActions('mailingList')
</script>

<template>
  <Btn v-bind="mailingList" />
</template>
