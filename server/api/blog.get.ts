import { XMLParser } from 'fast-xml-parser'
import type { Feed } from '~/types/blog'

async function getFeed(feedUrl: string) {
  const rss = await $fetch<string>(feedUrl)
  return rss
}

async function fetchPosts(url: string): Promise<Feed> {
  const rss = await getFeed(url)
  const root = new XMLParser().parse(rss)
  const { channel } = root.rss

  const regex = /<img.*?src="(.*?)"/g
  return {
    // transform posts and extract images to a new array key
    items: channel.item.map((post: any) => {
      const images = Array.from(String(post['content:encoded'])
        .matchAll(regex)).map(match => match[1]).filter(Boolean)
      let snippet = post['content:encoded'].replace(/(<([^>]+)>)/g, '')
      if (snippet.length > 200) {
        snippet = `${snippet.slice(0, 200)}...`
      }
      return {
        title: post.title,
        snippet,
        pubDate: post.pubDate,
        isoDate: post.isoDate,
        link: post.link,
        images,
      }
    }),
  }
}

export default defineCachedEventHandler(async (event) => {
  const config = useRuntimeConfig(event)
  try {
    const feedUrl = config.public.blogFeedUrl
    if (!feedUrl)
      throw createError({ message: 'Please add a valid blogFeedUrl to your public runtime config' })
    const posts = await fetchPosts(feedUrl)
    return posts
  }
  catch (e: any) {
    console.error('failed to get blog posts:', e)
    // throw a generic error
    throw createError({ status: 500, message: `Failed to fetch posts: ${e.message}` })
  }
}, { maxAge: 60 * 60 }) // cache API response for 60 minutes
