import GhostContentAPI from '@tryghost/content-api'

export default defineCachedEventHandler(async (event) => {
  const slug = getRouterParam(event, 'slug')
  if (!slug) {
    throw createError({
      status: 400,
      message: 'Missing slug parameter',
    })
  }

  try {
    const config = useRuntimeConfig()
    const { url, key, version } = config.public.ghost

    // Create API instance with site credentials
    const api = new GhostContentAPI({
      url,
      key,
      version,
    })

    // Get the specific post by slug
    const post = await api.posts.read({ slug }, { include: ['tags'] })

    // Process the content
    const content = post.html || ''

    return {
      title: post.title,
      content,
      snippet: post.excerpt || '',
      pubDate: post.published_at || '',
      isoDate: post.published_at || '',
      slug: post.slug,
      images: post.feature_image ? [post.feature_image] : [],
    }
  }
  catch (error: any) {
    console.error(`Failed to get post with slug ${slug}:`, error)
    throw createError({
      status: error.response?.status || 500,
      message: `Failed to fetch post: ${error.message}`,
    })
  }
}, { maxAge: 60 * 60 }) // cache API response for 60 minutes
