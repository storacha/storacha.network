<script lang="ts" setup>
import type { Feed } from '~/types/blog'

const MAX_AGE = 1000 * 60 * 60
const isExpired = (d: Date, maxAge = MAX_AGE) => Date.now() - d.getTime() > maxAge

const { data: blog } = await useLazyFetch<Feed>('/api/blog', {
  default: () => ({ items: [] }), // Add default value
  getCachedData (key, nuxt) {
    const defaultData = nuxt.isHydrating ? nuxt.payload.data[key] : nuxt.static.data[key]
    if (typeof globalThis.localStorage === 'undefined') {
      return defaultData
    }

    const ts = new Date(localStorage.getItem('blog:ts') ?? 0)
    if (isExpired(ts)) {
      console.log(`cache miss blog items (${Date.now() - ts.getTime()} > ${MAX_AGE})`)
      return defaultData
    }

    console.log(`cache hit blog items (${Date.now() - ts.getTime()} < ${MAX_AGE})`)
    const items = JSON.parse(localStorage.getItem('blog:items') ?? '[]')
    return items.length ? { items } : defaultData
  },
  onResponse ({ response }) {
    if (typeof globalThis.localStorage !== 'undefined') {
      console.log('caching blog items')
      localStorage.setItem('blog:ts', new Date().toISOString())
      localStorage.setItem('blog:items', JSON.stringify(response._data.items))
    }
  }
})

const medium = useSocialNetwork('medium')
</script>

<template>
  <Section class="bg-white" padding>
    <div class="py-4 flex md:flex-row flex-col mt-20">
      <div class="flex-none mb-4 md:mb-0">
        <Heading type="h4" class="uppercase color-brand-3">
          Blazing Hot News
        </Heading>
        <p class="max-w-50ch text-pretty prose p1 color-brand-3">The latest and greatest from the Storacha team.</p>
      </div>
      <div class="flex-auto md:text-right">
        <Btn text="Follow on Medium" :href="medium?.href" />
      </div>
    </div>
    <div class="blog-cell grid gap-4 lg:cols-3 md:cols-2">
      <BlogCard
        v-for="item in blog?.items || []"
        :key="item.title"
        :item="item"
        class="grid-rows-subgrid"
        show-snippet
      />
    </div>
  </Section>
</template>