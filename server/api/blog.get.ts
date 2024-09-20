import { XMLParser } from 'fast-xml-parser'
import type { Feed } from '~/types/blog'

async function getFeed(feedUrl: string) {
  const rss = await $fetch<string>(feedUrl)
  return rss
}

async function fetchPosts(url: string): Promise<Feed> {
  console.log('fetching posts')
  const rss = await getFeed(url)
  const root = new XMLParser().parse(rss)
  const { channel } = root.rss

  console.log('channel items:', channel.item)

  const regex = /<img.*?src="(.*?)"/g
  return {
    // transform posts and extract images to a new array key
    items: channel.item.map((post: any) => {
      const images = Array.from(String(post['content:encoded'])
        .matchAll(regex)).map(match => match[1]).filter(Boolean)
      return {
        title: post.title,
        pubDate: post.pubDate,
        isoDate: post.isoDate,
        link: post.link,
        images
      }
    })
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
}, { maxAge: 60 * 5 }) // cache API response for 5 minutes
