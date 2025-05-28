<script lang="ts" setup>
import type { Ecosystem } from '~/types'

interface EcosystemCardProps {
  title: string
  description: string
  category: Ecosystem.Category
  action?: {
    text: string
    href: string
  }
  icon?: string
}

defineProps<EcosystemCardProps>()

function getHostname(url?: string) {
  return url && new URL(url).hostname
}

function getIcon(icon?: string, hostname?: string) {
  if (icon) {
    return icon.startsWith('http') ? icon : `/img/ecosystem/icons/${icon}`
  }
  else if (hostname) {
    // use DuckDuckGo favicon service as a fallback
    return `https://icons.duckduckgo.com/ip3/${hostname}.ico`
  }
}
</script>

<template>
  <div
    class="ecosystem-card overflow-hidden rounded-2xl bg-brand-1 bg-cover text-white"
    :style="`background-image: url(/img/ecosystem/categories/${category.id}.webp)`"
  >
    <div class="relative aspect-ratio-video flex flex-col gap-4 bg-gradient-from-transparent to-brand-1 to-80% bg-gradient-to-b p-4 [&:hover>.back]:opacity-100">
      <CategoryPill v-if="category" class="absolute right-4 top-4">
        {{ category.icon }} {{ category.name }}
      </CategoryPill>
      <div class="avatar mt-a">
        <div v-if="icon || action" class="h-[48px] w-[48px] inline-flex select-none items-center justify-center overflow-hidden b-1 rounded-full bg-white align-middle">
          <img
            class="h-full w-full rounded-[inherit] object-cover"
            :src="getIcon(icon, getHostname(action?.href))"
            :alt="title"
            loading="lazy"
          >
        </div>
      </div>
      <Heading type="h4">
        {{ title }}
      </Heading>
      <div v-if="description" class="flex items-center gap-1 lh-none">
        Read More<AppIcon i="i-carbon:arrow-right" />
      </div>
      <AppLink
        :href="action?.href"
        class="back absolute inset-0 flex flex-col gap-4 p-4 opacity-0 backdrop-blur-xl transition-all"
        tabindex="0"
      >
        <div class="mt-a flex">
          {{ description }}
        </div>
        <div v-if="action" class="flex items-center gap-1 lh-none">
          {{ action.text }}<AppIcon i="i-carbon:arrow-up-right" />
        </div>
      </AppLink>
      <slot />
    </div>
  </div>
</template>
