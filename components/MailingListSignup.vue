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

const { width, height } = useWindowSize()

const iframeHeight = computed(() => {
  if (width.value < 768) {
    return height.value - 100
  }
  return 580
})
</script>

<template>
  <div>
    <Dialog>
      <DialogTrigger as-child>
        <Btn v-bind="{ ...mailingList, ...$attrs }" @click.prevent />
      </DialogTrigger>
      <DialogContent>
        <iframe width="100%" :height="iframeHeight" :src="mailingList.href" frameborder="0" scrolling="auto" style="display: block;margin: auto;max-width: 100%;" />
      </DialogContent>
    </Dialog>
  </div>
</template>
