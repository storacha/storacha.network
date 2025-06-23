<script lang="ts" setup>
import type { AppConfig } from 'nuxt/schema'
import { Dialog, DialogContent, DialogTrigger } from '~/components/Modal/mailingList'

interface MailingListProps {
  mailingList?: AppConfig['actions']['mailingList']
}

defineOptions({
  inheritAttrs: false,
})

const { mailingList = useActions('mailingList') } = defineProps<MailingListProps>()

// Move window size logic inside ClientOnly to avoid SSR issues
const iframeHeight = ref(580) // default height

function updateIframeHeight() {
  if (process.client) {
    const { width, height } = useWindowSize()
    iframeHeight.value = computed(() => {
      if (width.value < 768) {
        return height.value - 100
      }
      return 580
    }).value
  }
}

onMounted(() => {
  updateIframeHeight()
})
</script>

<template>
  <ClientOnly>
    <Dialog>
      <DialogTrigger as-child>
        <Btn v-bind="{ ...mailingList, ...$attrs }" @click.prevent class="flex items-center justify-center text-center" />
      </DialogTrigger>
      <DialogContent>
        <iframe 
          width="100%" 
          :height="iframeHeight" 
          :src="mailingList.href" 
          frameborder="0" 
          scrolling="auto" 
          style="display: block;margin: auto;max-width: 100%;" 
        />
      </DialogContent>
    </Dialog>
    <template #fallback>
      <a :href="mailingList.href" target="_blank" v-bind="$attrs" class="btn btn-outline flex items-center justify-center text-center">
        Join Mailing List
      </a>
    </template>
  </ClientOnly>
</template>