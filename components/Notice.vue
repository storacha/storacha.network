<script lang="ts" setup>
interface NoticeProps {
  displayUntil: string
  text: string
  href: string
}

const props = defineProps<NoticeProps>()
const isVisible = ref(false)

onMounted(() => {
  isVisible.value = new Date(props.displayUntil).getTime() > Date.now()
})
</script>

<template>
  <div v-if="isVisible" class="bg-brand-3 p-3 text-center text-sm text-brand-4">
    <AppLink :href="href" class="block w-full">
      {{ text }} <AppIcon i="i-carbon:arrow-right" class="inline-block" />
    </AppLink>
  </div>
</template>
