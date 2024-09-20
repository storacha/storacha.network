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
      <AppLink :href="item.link">
        <div class="flex flex-col gap-2">
          <Heading type="h5" class="font-medium">
            {{ item.title }}
          </Heading>
          <time class="h5 text-sm" :datetime="item.isoDate">
            {{ useAppDateFormat(item.isoDate) }}
          </time>
          <!-- <div v-if="showSnippet" class="text-base p1" v-html="`${item['content:encodedSnippet'].slice(0, 200)}...`" /> -->
        </div>
      </AppLink>
    </article>
  </Card>
</template>

<style lang="postcss" scoped>
.blog-card img {
  @apply opacity-80 transition-opacity;
}
.blog-card:hover img {
  @apply opacity-100
}
</style>
