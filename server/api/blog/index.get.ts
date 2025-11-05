import GhostContentAPI from '@tryghost/content-api'
import type { Feed, Item } from '~/types/blog'

async function fetchGhostPosts(event: any): Promise<Feed> {
  const config = useRuntimeConfig(event)
  const { url, key, version } = config.public.ghost

  const api = new GhostContentAPI({ url, key, version })

  const posts = await api.posts.browse({
    limit: 'all',
    fields: ['title', 'slug', 'feature_image', 'published_at', 'excerpt'],
  })

  if (!posts?.length)
    return { items: [] }

  const items: Item[] = posts.map(post => ({
    title: post.title || '🌀 Uh-oh, the title went on a data adventure 🌍. Please refresh the page.',
    snippet: post.excerpt || '🌀 Uh-oh, the snippet went on a data adventure 🌍. Please refresh the page.',
    pubDate: post.published_at || new Date().toISOString(),
    isoDate: post.published_at || new Date().toISOString(),
    link: `/blog/${post.slug}`,
    images: post.feature_image ? [post.feature_image] : [],
  }))

  return { items }
}

export default defineCachedEventHandler(async (event) => {
  try {
    return await fetchGhostPosts(event)
  }
  catch (e: any) {
    console.error('Failed to get blog posts:', e)
    return { items: [] }
  }
})
