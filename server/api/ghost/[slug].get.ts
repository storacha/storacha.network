// server/api/ghost/[slug].get.ts - Debug version
import type { GhostPost } from '~/types/ghost'

export default defineCachedEventHandler(async (event) => {
  console.log('=== Ghost API Debug ===')
  
  const slug = getRouterParam(event, 'slug')
  console.log('Slug:', slug)
  
  if (!slug) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Slug parameter required'
    })
  }
  
  // Debug environment variables
  console.log('Environment debug:', {
    processEnvGhostUrl: process.env.NUXT_PUBLIC_GHOST_URL,
    processEnvApiKey: process.env.NUXT_PUBLIC_GHOST_CONTENT_API_KEY,
    cloudflareContext: !!event.context.cloudflare,
    cloudflareEnv: event.context.cloudflare?.env,
    allProcessEnv: Object.keys(process.env).filter(key => key.includes('GHOST'))
  })
  
  // Try useRuntimeConfig as fallback
  let ghostUrl, apiKey
  
  try {
    const config = useRuntimeConfig()
    ghostUrl = config.public.ghostUrl
    apiKey = config.public.ghostContentApiKey
    console.log('RuntimeConfig values:', { ghostUrl, apiKey: !!apiKey })
  } catch (configError) {
    console.error('RuntimeConfig error:', configError)
  }
  
  // Fallback to process.env
  if (!ghostUrl || !apiKey) {
    ghostUrl = process.env.NUXT_PUBLIC_GHOST_URL
    apiKey = process.env.NUXT_PUBLIC_GHOST_CONTENT_API_KEY
    console.log('Process.env values:', { ghostUrl, apiKey: !!apiKey })
  }
  
  // Fallback to cloudflare context
  if (!ghostUrl || !apiKey) {
    ghostUrl = event.context.cloudflare?.env?.NUXT_PUBLIC_GHOST_URL
    apiKey = event.context.cloudflare?.env?.NUXT_PUBLIC_GHOST_CONTENT_API_KEY
    console.log('Cloudflare context values:', { ghostUrl, apiKey: !!apiKey })
  }
  
  if (!ghostUrl || !apiKey) {
    console.error('Ghost configuration completely missing!')
    throw createError({
      statusCode: 500,
      statusMessage: 'Ghost CMS not configured - check environment variables'
    })
  }
  
  console.log('Final values:', { ghostUrl, apiKey: apiKey.substring(0, 10) + '...' })
  
  try {
    const cleanUrl = ghostUrl.replace(/\/$/, '')
    const apiUrl = `${cleanUrl}/ghost/api/content/posts/slug/${slug}/`
    
    console.log('Making request to:', apiUrl)
    
    const response = await $fetch<{posts: GhostPost[]}>(apiUrl, {
      query: {
        key: apiKey,
        include: 'tags,authors',
        formats: 'html,plaintext'
      },
      headers: {
        'Accept-Version': 'v5.0',
        'User-Agent': 'Storacha-Ghost-Reader/1.0'
      }
    })
    
    console.log('Ghost API response:', { 
      postsCount: response.posts?.length,
      firstPostTitle: response.posts?.[0]?.title 
    })
    
    if (!response.posts?.[0]) {
      throw createError({
        statusCode: 404,
        statusMessage: 'Post not found'
      })
    }
    
    return response.posts[0]
  } catch (error: any) {
    console.error('Ghost API error details:', {
      message: error.message,
      statusCode: error.statusCode,
      status: error.status,
      data: error.data
    })
    
    if (error.statusCode === 404 || error.status === 404) {
      throw createError({
        statusCode: 404,
        statusMessage: 'Post not found'
      })
    }
    
    throw createError({
      statusCode: 500,
      statusMessage: `Ghost API error: ${error.message}`
    })
  }
}, {
  maxAge: 60 * 30,
  varies: ['slug']
})