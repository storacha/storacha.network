<script lang="ts" setup>
import { Card } from '#components'
import type { Item } from '~/types/blog'

defineProps<{
  item: Item
  showSnippet?: boolean
}>()
// Change the path as required
const fallbackImage = '/img/fallback.png'
function handleImageError(event: Event) {
  const target = event.target as HTMLImageElement
  target.src = fallbackImage
}
</script>

<template>
  <Card class="blog-card overflow-clip">
    <template #header>
      <NuxtLink :to="item.link" class="aspect-ratio-video overflow-hidden">
        <img :src="item.images?.[0] || fallbackImage" loading="lazy" :alt="item.title"
          class="h-full w-full object-cover object-left" @error="handleImageError">
      </NuxtLink>
    </template>
    <article>
      <NuxtLink :to="item.link" style="display:block">
        <div class="flex flex-col gap-2">
          <Heading type="h5" class="font-medium">
            {{ item.title }}
          </Heading>
          <time class="h5 text-sm" :datetime="item.pubDate">
            {{ useAppDateFormat(item.pubDate) }}
          </time>
          <p v-if="showSnippet" class="text-base p1 break-words">
            {{ item.snippet }}
          </p>
        </div>
      </NuxtLink>
    </article>
  </Card>
</template>
