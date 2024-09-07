<script setup lang="ts">
import { DialogClose, DialogContent, type DialogContentEmits, type DialogContentProps, DialogDescription, DialogOverlay, DialogPortal, DialogTitle, useEmitAsProps, VisuallyHidden } from 'radix-vue'

const props = defineProps<DialogContentProps>()
const emits = defineEmits<DialogContentEmits>()

const emitsAsProps = useEmitAsProps(emits)
</script>

<template>
  <DialogPortal>
    <DialogOverlay class="fixed inset-0 z-100 bg-black/30 data-[state=open]:animate-overlayShow" />
    <DialogContent class="fixed left-[50%] top-[50%] z-[100] max-h-[98vh] max-w-[580px] w-[90vw] translate-x-[-50%] translate-y-[-50%] overflow-clip rounded-2xl bg-white md:max-h-600px data-[state=open]:animate-contentShow focus:outline-none" v-bind="{ ...props, ...emitsAsProps }">
      <VisuallyHidden>
        <DialogTitle>Mailing List Signup</DialogTitle>
        <DialogDescription>
          Form to sign up for the Storacha mailing list.
        </DialogDescription>
      </VisuallyHidden>
      <slot />
      <DialogClose class="absolute right-3 top-3 h-7 w-7 inline-flex appearance-none items-center justify-center rounded-full text-[#3d3f42] transition-colors hover:bg-brand-3 hover:text-white focus:shadow-[0_0_0_2px] focus:shadow-brand-3 focus:outline-none">
        <span class="i-carbon:close" />
        <span class="sr-only">Close</span>
      </DialogClose>
    </DialogContent>
  </DialogPortal>
</template>
