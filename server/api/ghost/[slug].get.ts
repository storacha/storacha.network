// server/api/ghost/[slug].get.ts - Debug Version
import type { GhostPost } from '~/types/ghost'

export default defineCachedEventHandler(async (event) => {
  const slug = getRouterParam(event, 'slug')
  
  if (!slug) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Slug parameter required'
    })
  }
  
  // ✅ Validate slug format - reject non-blog-post requests
  if (!isValidBlogSlug(slug)) {
    throw createError({
      statusCode: 404,
      statusMessage: 'Invalid blog post slug'
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
    
    // ✅ Debug logging - check what Ghost is actually returning
    console.log('=== GHOST API DEBUG ===')
    console.log('Post Title:', post.title)
    console.log('Post Slug:', post.slug)
    console.log('Excerpt Length:', post.excerpt?.length || 0)
    console.log('Excerpt Content:', JSON.stringify(post.excerpt))
    console.log('HTML Length:', post.html?.length || 0)
    console.log('HTML Preview (first 200 chars):', post.html?.substring(0, 200))
    console.log('Available Fields:', Object.keys(post))
    console.log('======================')
    
    // ✅ Clean up excerpt if it's malformed
    const cleanedPost = {
      ...post,
      excerpt: cleanExcerpt(post.excerpt, post.html)
    }
    
    console.log('✅ Ghost post processed:', cleanedPost.title)
    return cleanedPost
    
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

/**
 * Clean up malformed excerpts from Ghost
 */
function cleanExcerpt(excerpt: string | undefined, html: string | undefined): string {
  if (!excerpt) {
    // If no excerpt, extract from HTML
    return extractExcerptFromHtml(html || '')
  }
  
  // Check if excerpt looks malformed (too long, contains HTML, weird concatenation)
  if (excerpt.length > 300 || excerpt.includes('<') || excerpt.includes('Click here')) {
    console.warn('⚠️ Malformed excerpt detected, extracting from HTML instead')
    return extractExcerptFromHtml(html || '')
  }
  
  return excerpt.trim()
}

/**
 * Extract a clean excerpt from HTML content
 */
function extractExcerptFromHtml(html: string): string {
  if (!html) return 'No content available'
  
  // Remove HTML tags and extract clean text
  const cleanText = html
    .replace(/<[^>]*>/g, ' ')           // Remove HTML tags
    .replace(/&[^;]+;/g, ' ')          // Remove HTML entities
    .replace(/\s+/g, ' ')              // Normalize whitespace
    .trim()
  
  // Get first 150 characters, breaking at word boundary
  if (cleanText.length <= 150) {
    return cleanText
  }
  
  const truncated = cleanText.substring(0, 150)
  const lastSpace = truncated.lastIndexOf(' ')
  
  if (lastSpace > 100) {
    return truncated.substring(0, lastSpace) + '...'
  }
  
  return truncated + '...'
}

/**
 * Validate that the slug looks like a real blog post slug
 */
function isValidBlogSlug(slug: string | undefined): slug is string {
  if (!slug || typeof slug !== 'string') return false
  
  // Reject obvious non-blog-post patterns
  const invalidPatterns = [
    /\.css$/,           // CSS files
    /\.map$/,           // Source maps
    /\.js$/,            // JavaScript files
    /\.json$/,          // JSON files
    /\.xml$/,           // XML files
    /\.ico$/,           // Icons
    /\.png$/,           // Images
    /\.jpg$/,           // Images
    /\.jpeg$/,          // Images
    /\.gif$/,           // Images
    /\.svg$/,           // Images
    /\.woff$/,          // Fonts
    /\.woff2$/,         // Fonts
    /\.ttf$/,           // Fonts
    /\.eot$/,           // Fonts
    /^assets\//,        // Asset paths
    /^static\//,        // Static paths
    /^_nuxt\//,         // Nuxt paths
    /^\./,              // Hidden files
    /\/$/,              // Paths ending with slash
    /^[0-9]+$/,         // Pure numbers
    /[<>:"/\\|?*]/,     // Invalid filename characters
  ]
  
  // Check against invalid patterns
  if (invalidPatterns.some(pattern => pattern.test(slug))) {
    return false
  }
  
  // Valid blog slug characteristics
  const validSlugPattern = /^[a-zA-Z0-9][a-zA-Z0-9\-_.]*[a-zA-Z0-9]$/
  
  // Must be reasonable length
  if (slug.length < 2 || slug.length > 200) {
    return false
  }
  
  // Must match valid slug pattern
  return validSlugPattern.test(slug)
}