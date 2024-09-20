import * as RSS from 'rss-to-json'

async function getFeed(feedUrl: string) {
  const rss = await $fetch<string>(feedUrl)
  return rss
}

async function fetchPosts(url: string) {
  const rss = await getFeed(url)
  const data = await RSS.parse(rss)

  const regex = /<img.*?src="(.*?)"/g
  // transform posts and extract images to a new array key
  data.items = data.items.map((post) => {
    const images = Array.from(String(post.description)
      .matchAll(regex)).map(match => match[1]).filter(Boolean)

    return images.length ? { ...post, images } : post
  })

  return data
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
