<script lang="ts" setup>
import { Dialog, DialogContent, DialogTrigger } from '~/components/Modal/mailingList'

const mailingList = useActions('mailingList')

const { width, height } = useWindowSize()

const iframeHeight = computed(() => {
  if (width.value < 768)
    return height.value - 200
  return 540
})
</script>

<template>
  <Dialog>
    <DialogTrigger as-child>
      <Btn v-bind="mailingList" @click.prevent />
    </DialogTrigger>
    <DialogContent>
      <iframe width="100%" :height="iframeHeight" :src="mailingList.href" frameborder="0" scrolling="auto" style="display: block;margin: auto;max-width: 100%;" />
    </DialogContent>
  </Dialog>
</template>
