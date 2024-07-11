import Parser from 'rss-parser'

async function getFeed(username: string) {
  const rss = await $fetch<string>(`https://medium.com/feed/@${username}`)
  return rss
}

async function parseRSS(rss: string) {
  const parser = new Parser()
  const feed = await parser.parseString(rss)
  return feed
}

async function fetchPosts(username: string) {
  const rss = await getFeed(username)
  const posts = await parseRSS(rss)
  return posts
}

export default defineCachedEventHandler(async (event) => {
export default defineCachedEventHandler(async (event) => {
  const config = useRuntimeConfig(event)
  try {
    const posts = await fetchPosts(config.public.medium)
    return posts
  }
  catch (e) {
    throw createError({ status: 500, message: 'Failed to fetch posts' })
  }
}, { maxAge: 60 * 5 }) // cache API response for 5 minutes
