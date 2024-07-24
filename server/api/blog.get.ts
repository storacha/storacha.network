import Parser from 'rss-parser'
import type { Feed, Item } from '~/types/blog'

async function getFeed(feedUrl: string) {
  const rss = await $fetch<string>(feedUrl)
  return rss
}

async function parseRSS(rss: string) {
  const parser = new Parser<Feed, Item>()
  const feed = await parser.parseString(rss)
  return feed
}

async function fetchPosts(username: string) {
  const rss = await getFeed(username)
  const posts = await parseRSS(rss)

  // transform posts and extract images to a new array key
  posts.items = posts.items.map((post) => {
    const images = (post['content:encoded']?.match(/<img.*?src="([^"]*)"/g))
      ?.map(imgTag => imgTag.match(/src="([^"]*)"/)?.[1])
      ?.filter((src): src is string => !!src)
    return { ...post, images }
  })

  return posts
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
    if (e.cause)
      // rethrow the original error
      throw createError(e.cause)
    // throw a generic error
    throw createError({ status: 500, message: 'Failed to fetch posts' })
  }
}, { maxAge: 60 * 5 }) // cache API response for 5 minutes
