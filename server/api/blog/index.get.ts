import GhostContentAPI from '@tryghost/content-api'
import type { Feed, Item } from '~/types/blog'

async function fetchGhostPosts(): Promise<Feed> {
  const config = useRuntimeConfig()
  const { url, key, version } = config.public.ghost

  const api = new GhostContentAPI({ url, key, version })

  const posts = await api.posts.browse({
    limit: 'all',
    fields: ['title', 'slug', 'feature_image', 'published_at', 'excerpt'],
  })

  if (!posts?.length) return { items: [] }

  const items: Item[] = posts.map((post) => ({
    title: post.title || 'Untitled',
    snippet: post.excerpt || '',
    pubDate: post.published_at || new Date().toISOString(),
    isoDate: post.published_at || new Date().toISOString(),
    link: `/blog/${post.slug}`,
    images: post.feature_image ? [post.feature_image] : [],
  }))

  return { items }
}

export default defineCachedEventHandler(async () => {
  try {
    return await fetchGhostPosts()
  }
  catch (e: any) {
    console.error('Failed to get blog posts:', e)
    return { items: [] }
  }
}, { maxAge: 3600 })