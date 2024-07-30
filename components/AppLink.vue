<script setup lang="ts">
import type { NuxtLinkProps } from '#app/components'

export type AppLinkProps = NuxtLinkProps
defineProps<AppLinkProps>()

function isExternal(href: NuxtLinkProps['href']) {
  return typeof href === 'string' ? (href?.startsWith('http') || href?.startsWith('//')) : false
}
</script>

<template>
  <NuxtLink
    class="inline-block cursor-pointer"
    :href="href || to" :target="isExternal(href || to) ? '_blank' : undefined"
  >
    <slot />
  </NuxtLink>
</template>
