import GhostContentAPI from '@tryghost/content-api'
import type { Feed, Item } from '~/types/blog'

async function fetchGhostPosts(): Promise<Feed> {
  const config = useRuntimeConfig()
  const { url, key, version } = config.public.ghost

  // Create API instance with site credentials
  const api = new GhostContentAPI({
    url,
    key,
    version,
  })

  // Get all posts with their featured image
  const posts = await api.posts.browse({
    limit: 'all',
    include: ['tags'],
    fields: ['id', 'title', 'slug', 'feature_image', 'published_at', 'html', 'excerpt'],
  })

  // Transform Ghost posts to match our Item interface
  const items: Item[] = posts.map((post) => {
    // Extract the first paragraph as a snippet if excerpt is not available
    let snippet = post.excerpt || ''
    if (!snippet && post.html) {
      snippet = post.html.replace(/(<([^>]+)>)/g, '')
      if (snippet.length > 200) {
        snippet = `${snippet.slice(0, 200)}...`
      }
    }

    return {
      title: post.title || '',
      snippet,
      pubDate: post.published_at || '',
      isoDate: post.published_at || '',
      link: `/blog/${post.slug}`,
      images: post.feature_image ? [post.feature_image] : [],
    }
  })

  return { items }
}

export default defineCachedEventHandler(async (_event) => {
  try {
    const posts = await fetchGhostPosts()
    return posts
  }
  catch (e: any) {
    console.error('failed to get blog posts:', e)
    // throw a generic error
    throw createError({ status: 500, message: `Failed to fetch posts: ${e.message}` })
  }
}, { maxAge: 60 * 60 }) // cache API response for 60 minutes
