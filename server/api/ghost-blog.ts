// server/api/ghost-blog.ts - Optimized caching strategy
import type { GhostResponse, GhostFeed } from '~/types/ghost'

async function fetchGhostPosts(ghostUrl: string, apiKey: string): Promise<GhostFeed> {
  try {
    const cleanUrl = ghostUrl.replace(/\/$/, '')
    const apiUrl = `${cleanUrl}/ghost/api/content/posts/`
    
    console.log('Fetching Ghost posts from:', apiUrl)
    
    const response = await $fetch<GhostResponse>(apiUrl, {
      query: {
        key: apiKey,
        limit: 10,
        include: 'tags,authors',
        fields: 'id,title,slug,excerpt,feature_image,published_at,updated_at,reading_time,url,html,created_at,featured',
        order: 'published_at DESC',
      },
      headers: {
        'Accept-Version': 'v5.0',
        'User-Agent': 'Storacha-Ghost-Reader/1.0',
        'Accept': 'application/json'
      }
    })

    if (!response?.posts) {
      throw new Error('Invalid Ghost API response - missing posts')
    }

    return {
      posts: response.posts
    }
  } catch (error: unknown) {
    console.error('Ghost API fetch error:', error)
    
    const err = error as any
    
    if (err.status === 401) {
      throw createError({
        statusCode: 401,
        statusMessage: 'Ghost API key invalid'
      })
    }
    
    if (err.status === 404) {
      throw createError({
        statusCode: 404,
        statusMessage: 'Ghost site not found'
      })
    }
    
    throw createError({
      statusCode: 500,
      statusMessage: 'Ghost API error',
      data: { error: err.message }
    })
  }
}

export default defineCachedEventHandler(async (event) => {
  try {
    const config = useRuntimeConfig()
    const query = getQuery(event)
    
    const ghostUrl = config.public.ghostUrl as string
    const apiKey = config.public.ghostContentApiKey as string
    
    if (!ghostUrl || !apiKey) {
      throw createError({
        statusCode: 500,
        statusMessage: 'Ghost CMS not configured'
      })
    }
    
    // Check for cache bypass parameter
    if (query.refresh === 'true') {
      console.log('Cache bypass requested - fetching fresh data')
    }
    
    return await fetchGhostPosts(ghostUrl, apiKey)
    
  } catch (error: unknown) {
    const err = error as any
    
    if (err.statusCode) {
      throw err
    }
    
    throw createError({
      statusCode: 500,
      statusMessage: 'Ghost blog service error'
    })
  }
}, { 
  // Optimized cache settings based on best practices
  maxAge: 60 * 5,           // 5 minutes base cache (faster content updates)
  staleMaxAge: 60 * 60,     // Serve stale for 1 hour while revalidating
  swr: true,                // Enable stale-while-revalidate
  varies: ['Accept-Encoding'],
  
  // Cache key includes query params for cache busting
  getKey: (event) => {
    const query = getQuery(event)
    return `ghost-blog-${query.refresh || 'default'}`
  }
})