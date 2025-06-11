<script lang="ts" setup>
import { Card } from '#components'
import type { Item } from '~/types/blog'

defineProps<{
  item: Item
  showSnippet?: boolean
}>()
</script>

<template>
  <Card class="blog-card overflow-clip">
    <template #header>
      <AppLink :href="item.link" class="aspect-ratio-video overflow-hidden">
        <img
          :src="item.images?.[0]"
          loading="lazy"
          :alt="item.title"
          class="h-full w-full object-cover object-left"
        >
      </AppLink>
    </template>
    <article>
      <AppLink :href="item.link" style="display:block">
        <div class="flex flex-col gap-2">
          <Heading type="h5" class="font-medium">
            {{ item.title }}
          </Heading>
          <time class="h5 text-sm" :datetime="item.pubDate">
            {{ useAppDateFormat(item.pubDate) }}
          </time>
          <p v-if="showSnippet" class="break-words text-base p1">
            {{ item.snippet }}
          </p>
        </div>
      </AppLink>
    </article>
  </Card>
</template>
