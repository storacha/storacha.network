import Parser from 'rss-parser/dist/rss-parser.min.js'
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
  // @ts-ignore
  posts.items = posts.items.map((post) => {
    const regex = /<img.*?src="(.*?)"/g
    const images = Array.from(post['content:encoded']
      // @ts-ignore
      .matchAll(regex)).map(match => match[1]).filter(Boolean)

    return images.length ? { ...post, images } : post
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
    console.error(e)
    // throw a generic error
    throw createError({ status: 500, message: `Failed to fetch posts: ${e.message}` })
  }
}, { maxAge: 60 * 5 }) // cache API response for 5 minutes
