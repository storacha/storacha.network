// server/api/ghost/[slug].get.ts - FIXED VERSION
import type { GhostPost } from '~/types/ghost'

export default defineCachedEventHandler(async (event) => {
  const slug = getRouterParam(event, 'slug')
  
  if (!slug) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Slug parameter required'
    })
  }
  
  // ✅ IMMEDIATE FIX: Block .map files and other assets FIRST
  if (slug.endsWith('.map') || slug.endsWith('.css') || slug.endsWith('.js')) {
    console.warn(`🚫 Blocked asset request: ${slug}`)
    throw createError({
      statusCode: 404,
      statusMessage: 'Asset not found'
    })
  }
  
  // ✅ More comprehensive asset blocking
  const assetExtensions = [
    '.map', '.css', '.js', '.json', '.xml', '.ico', '.png', '.jpg', 
    '.jpeg', '.gif', '.svg', '.woff', '.woff2', '.ttf', '.eot',
    '.webp', '.avif', '.mp4', '.webm', '.pdf', '.zip'
  ]
  
  if (assetExtensions.some(ext => slug.endsWith(ext))) {
    console.warn(`🚫 Blocked asset request: ${slug}`)
    throw createError({
      statusCode: 404,
      statusMessage: 'Asset not found'
    })
  }
  
  // ✅ Block obvious non-blog paths
  if (slug.includes('assets/') || slug.includes('static/') || slug.includes('_nuxt/')) {
    console.warn(`🚫 Blocked asset path: ${slug}`)
    throw createError({
      statusCode: 404,
      statusMessage: 'Asset not found'
    })
  }
  
  const config = useRuntimeConfig()
  const ghostUrl = config.public.ghostUrl
  const apiKey = config.public.ghostContentApiKey
  
  if (!ghostUrl || !apiKey) {
    throw createError({
      statusCode: 500,
      statusMessage: 'Ghost CMS not configured'
    })
  }
  
  try {
    const cleanUrl = ghostUrl.replace(/\/$/, '')
    const apiUrl = `${cleanUrl}/ghost/api/content/posts/slug/${slug}/`
    
    console.log(`🔍 Fetching Ghost post: ${slug}`)
    
    const response = await $fetch<{posts: GhostPost[]}>(apiUrl, {
      query: {
        key: apiKey,
        include: 'tags,authors',
        formats: 'html,plaintext'
      },
      headers: {
        'Accept-Version': 'v5.0',
        'User-Agent': 'Storacha-Ghost-Reader/1.0'
      },
      timeout: 10000
    })
    
    if (!response.posts?.[0]) {
      throw createError({
        statusCode: 404,
        statusMessage: 'Post not found'
      })
    }
    
    const post = response.posts[0]
    console.log(`✅ Ghost post processed: ${post.title}`)
    return post
    
  } catch (error: any) {
    console.error(`❌ Ghost API error for slug "${slug}":`, error.message)
    
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
  maxAge: 60 * 30, // 30 minutes
  varies: ['slug']
})