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
  <div
    v-if="isVisible"
    class="p-3 text-center text-sm text-white font-heading uppercase"
    style="background: linear-gradient(90deg, #E81E25 0%, #F6CB55 100%);"
  >
    <AppLink :href="href" class="block w-full" v-html="text" />
  </div>
</template>