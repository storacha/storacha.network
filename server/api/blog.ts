import { XMLParser } from 'fast-xml-parser'
import type { Feed } from '~/types/blog'
import { blogLogger } from '~/utils/logger'

async function getFeed(feedUrl: string) {
  const rss = await $fetch<string>(feedUrl)
  return rss
}

async function fetchPosts(url: string): Promise<Feed> {
  const rss = await getFeed(url)

  if (!rss || rss.trim().length === 0) {
    throw new Error('Empty RSS feed received')
  }

  const root = new XMLParser().parse(rss)

  // Add null checks for RSS structure
  if (!root?.rss?.channel) {
    throw new Error('Invalid RSS feed structure - missing channel')
  }

  const { channel } = root.rss

  // Handle case where there are no items
  if (!channel.item) {
    return { items: [] }
  }

  // Ensure channel.item is an array (sometimes it's a single object)
  const items = Array.isArray(channel.item) ? channel.item : [channel.item]

  const regex = /<img.*?src="(.*?)"/g
  return {
    items: items.map((post: any) => {
      try {
        const content = post['content:encoded'] || ''
        const images = Array.from(String(content)
          .matchAll(regex)).map(match => match[1]).filter(Boolean)
        let snippet = content.replace(/(<([^>]+)>)/g, '')
        if (snippet.length > 200) {
          snippet = `${snippet.slice(0, 200)}...`
        }
        return {
          title: post.title || 'Untitled',
          snippet,
          pubDate: post.pubDate || new Date().toISOString(),
          isoDate: post.isoDate || new Date().toISOString(),
          link: post.link || '#',
          images,
        }
      }
      catch (error) {
        blogLogger.warn('Failed to process blog post', {
          title: post.title,
          error: error instanceof Error ? error.message : String(error),
          stack: error instanceof Error ? error.stack : undefined,
        })
        return null
      }
    }).filter(Boolean), // Remove null entries
  }
}

export default defineCachedEventHandler(async (event) => {
  const config = useRuntimeConfig(event)
  try {
    const feedUrl = config.public.blogFeedUrl
    if (!feedUrl) {
      throw createError({
        statusCode: 500,
        statusMessage: 'Blog feed URL not configured',
      })
    }

    const posts = await fetchPosts(feedUrl)
    return posts
  }
  catch (e: any) {
    const requestId = getHeader(event, 'x-request-id') || 'unknown'

    blogLogger.error('Failed to get blog posts', {
      error: e.message || String(e),
      stack: e.stack,
      requestId,
      feedUrl: config.public.blogFeedUrl,
    })

    // Return empty data instead of throwing for client errors
    if (e.message?.includes('fetch') || e.message?.includes('Empty RSS') || e.message?.includes('Invalid RSS')) {
      blogLogger.warn('Blog feed issue, returning empty data', {
        error: e.message,
        requestId,
        feedUrl: config.public.blogFeedUrl,
      })
      return { items: [] }
    }

    // Only throw for server configuration errors
    throw createError({
      statusCode: 500,
      statusMessage: `Failed to fetch posts: ${e.message}`,
    })
  }
}, { maxAge: 60 * 60 })
