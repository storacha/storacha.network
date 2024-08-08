<script lang="ts" setup>
import { Card } from '#components'
import type { Item } from '~/types/blog'

defineProps<{
  item: Item
}>()

function formatDate(dateStr: string) { return useDateFormat(dateStr, 'MMM DD, YY') }
</script>

<template>
  <Card>
    <template #header>
      <AppLink :href="item.link" class="aspect-ratio-video overflow-hidden">
        <img :src="item.images?.[0]" :alt="item.title" class="h-full w-full object-cover object-left">
      </AppLink>
    </template>
    <article>
      <AppLink :href="item.link">
        <div class="flex flex-col gap-2">
          <Heading type="h5" class="font-medium">
            {{ item.title }}
          </Heading>
          <time class="h5 text-sm" :datetime="item.isoDate">
            {{ formatDate(item.isoDate) }}
          </time>
          <div class="text-base p1" v-html="`${item['content:encodedSnippet'].slice(0, 120)}...`" />
        </div>
      </AppLink>
    </article>
  </Card>
</template>

<style>

</style>
