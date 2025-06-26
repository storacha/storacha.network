// server/api/ghost-post/[slug].ts
import type { GhostResponse, GhostPost } from '~/types/ghost'

async function fetchGhostPostBySlug(ghostUrl: string, apiKey: string, slug: string): Promise<GhostPost> {
  try {
    const cleanUrl = ghostUrl.replace(/\/$/, '')
    const apiUrl = `${cleanUrl}/ghost/api/content/posts/slug/${slug}/`
    
    console.log('Fetching Ghost post:', apiUrl)
    
    const response = await $fetch<GhostResponse>(apiUrl, {
      query: {
        key: apiKey,
        include: 'tags,authors',
        fields: 'id,title,slug,excerpt,feature_image,published_at,updated_at,reading_time,url,html,created_at,featured',
      },
      headers: {
        'Accept-Version': 'v5.0',
        'User-Agent': 'Storacha-Ghost-Reader/1.0',
        'Accept': 'application/json'
      }
    })

    if (!response?.posts?.[0]) {
      throw createError({
        statusCode: 404,
        statusMessage: 'Post not found'
      })
    }

    return response.posts[0]
  } catch (error: unknown) {
    console.error('Ghost post fetch error:', error)
    
    const err = error as any
    
    if (err.statusCode === 404) {
      throw createError({
        statusCode: 404,
        statusMessage: 'Post not found'
      })
    }
    
    if (err.status === 401) {
      throw createError({
        statusCode: 401,
        statusMessage: 'Ghost API key invalid'
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
    const slug = getRouterParam(event, 'slug')
    
    if (!slug) {
      throw createError({
        statusCode: 400,
        statusMessage: 'Post slug is required'
      })
    }
    
    const ghostUrl = config.public.ghostUrl as string
    const apiKey = config.public.ghostContentApiKey as string
    
    if (!ghostUrl || !apiKey) {
      throw createError({
        statusCode: 500,
        statusMessage: 'Ghost CMS not configured'
      })
    }
    
    return await fetchGhostPostBySlug(ghostUrl, apiKey, slug)
    
  } catch (error: unknown) {
    const err = error as any
    
    if (err.statusCode) {
      throw err
    }
    
    throw createError({
      statusCode: 500,
      statusMessage: 'Ghost post service error'
    })
  }
}, { 
  maxAge: 60 * 60, // Cache individual posts for 1 hour
  varies: ['Accept-Encoding']
})