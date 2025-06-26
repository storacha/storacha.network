// server/api/ghost/index.get.ts
import type { GhostPost } from '~/types/ghost'

export default defineCachedEventHandler(async (event) => {
  const config = useRuntimeConfig()
  
  try {
    const cleanUrl = config.public.ghostUrl.replace(/\/$/, '')
    const response = await $fetch<{posts: GhostPost[]}>(`${cleanUrl}/ghost/api/content/posts/`, {
      query: {
        key: config.public.ghostContentApiKey,
        limit: 10,
        include: 'tags,authors',
        fields: 'id,title,slug,excerpt,feature_image,published_at,reading_time,url',
        order: 'published_at DESC'
      },
      headers: {
        'Accept-Version': 'v5.0',
        'User-Agent': 'Storacha-Ghost-Reader/1.0'
      }
    })
    
    if (!response?.posts) {
      throw new Error('Invalid Ghost API response - missing posts')
    }
    
    return {
      posts: response.posts
    }
  } catch (error: any) {
    console.error('Ghost API error:', error)
    
    if (error.status === 401) {
      throw createError({
        statusCode: 401,
        statusMessage: 'Ghost API key invalid'
      })
    }
    
    if (error.status === 404) {
      throw createError({
        statusCode: 404,
        statusMessage: 'Ghost site not found'
      })
    }
    
    throw createError({
      statusCode: 500,
      statusMessage: 'Ghost API error'
    })
  }
}, {
  maxAge: 60 * 5, // 5 minute cache for blog listing
  varies: ['Accept-Encoding']
})