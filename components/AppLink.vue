<script setup lang="ts">
import type { NuxtLinkProps } from '#app'

export interface AppLinkProps extends NuxtLinkProps {}

const props = withDefaults(
  defineProps<AppLinkProps>(),
  {
    prefetch: undefined,
    noPrefetch: undefined,
    noRel: undefined,
    replace: undefined,
    external: undefined,
    custom: undefined,
  },
)

function isExternal(href: NuxtLinkProps['href']) {
  return typeof href === 'string' ? (href?.startsWith('http') || href?.startsWith('//')) : false
}

const linkProps = computed(() => {
  const { target, ...rest } = props
  return rest
})
</script>

<template>
  <NuxtLink
    class="inline-block cursor-pointer"
    :target="target || (isExternal(href || to) ? '_blank' : undefined)"
    v-bind="linkProps"
  >
    <slot />
  </NuxtLink>
</template>
