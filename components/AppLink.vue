<script setup lang="ts">
import type { NuxtLinkProps } from '#app'
import { useForwardProps } from 'radix-vue'

export interface AppLinkProps extends NuxtLinkProps {}

const props = defineProps<AppLinkProps>()

function isExternal(href: NuxtLinkProps['href']) {
  return typeof href === 'string' ? (href?.startsWith('http') || href?.startsWith('//')) : false
}
const forwardProps = useForwardProps(reactiveOmit(props, ['target']))
</script>

<template>
  <NuxtLink
    class="inline-block cursor-pointer"
    :target="target || (isExternal(href || to) ? '_blank' : undefined)"
    v-bind="forwardProps"
  >
    <slot />
  </NuxtLink>
</template>