import Parser from 'rss-parser'

async function fetchPosts(username: string) {
  const getFeed = async () => {
    const rss = await $fetch<string>(`https://medium.com/feed/@${username}`)
    return rss
  }

  const parseRss = async (rss: string) => {
    const parser = new Parser()
    const feed = await parser.parseString(rss)
    return feed
  }

  const rss = await getFeed()
  const posts = await parseRss(rss) // parse rss to posts

  return posts
}

export default defineCachedEventHandler(async (event) => {
  const config = useRuntimeConfig(event)
  try {
    const posts = await fetchPosts(config.public.medium as string)
    return posts
  }
  catch (err) {
    return { err }
  }
}, { maxAge: 60 * 5 }) // cache API response for 5 minutes
