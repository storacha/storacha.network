// server/api/ghost/debug/[slug].get.ts - Raw Ghost Response Inspector
import type { GhostPost, GhostAuthor, GhostTag } from '~/types/ghost'

interface GhostDebugResponse {
  success: boolean
  analysis: {
    title: string
    slug: string
    excerpt: {
      content: string | undefined
      length: number
      hasHtml: boolean
      hasWeirdContent: boolean
      preview: string
    }
    html: {
      length: number
      preview: string
      hasContent: boolean
    }
    metadata: {
      published_at: string
      updated_at: string
      featured: boolean
      reading_time: number
    }
    authors: Array<{ name: string; slug: string }> | undefined
    tags: Array<{ name: string; slug: string }> | undefined
    availableFields: string[]
  }
  rawExcerpt: string | undefined
  rawHtmlPreview: string | undefined
}

interface GhostDebugError {
  error: string
  details?: string
  statusCode?: number
  response?: any
}

export default defineEventHandler(async (event): Promise<GhostDebugResponse | GhostDebugError> => {
  const slug = getRouterParam(event, 'slug')
  
  if (!slug) {
    return { error: 'Slug parameter required' }
  }
  
  const config = useRuntimeConfig()
  const ghostUrl = config.public.ghostUrl
  const apiKey = config.public.ghostContentApiKey
  
  if (!ghostUrl || !apiKey) {
    return { error: 'Ghost CMS not configured' }
  }
  
  try {
    const cleanUrl = ghostUrl.replace(/\/$/, '')
    const apiUrl = `${cleanUrl}/ghost/api/content/posts/slug/${slug}/`
    
    // Make the same request as your main API
    const response = await $fetch<{posts: GhostPost[]}>(apiUrl, {
      query: {
        key: apiKey,
        include: 'tags,authors',
        formats: 'html,plaintext'
      },
      headers: {
        'Accept-Version': 'v5.0',
        'User-Agent': 'Storacha-Ghost-Debug/1.0'
      },
      timeout: 10000
    })
    
    if (!response.posts?.[0]) {
      return { error: 'Post not found', response }
    }
    
    const post = response.posts[0]
    
    // Return detailed analysis
    return {
      success: true,
      analysis: {
        title: post.title,
        slug: post.slug,
        excerpt: {
          content: post.excerpt,
          length: post.excerpt?.length || 0,
          hasHtml: (post.excerpt?.includes('<') || post.excerpt?.includes('>')) || false,
          hasWeirdContent: (post.excerpt?.includes('Click here') || 
                           post.excerpt?.includes('Coming soon') ||
                           post.excerpt?.includes('Do this now')) || false,
          preview: post.excerpt ? post.excerpt.substring(0, 100) + '...' : 'No excerpt'
        },
        html: {
          length: post.html?.length || 0,
          preview: post.html ? post.html.substring(0, 200) + '...' : 'No HTML content',
          hasContent: !!post.html
        },
        metadata: {
          published_at: post.published_at,
          updated_at: post.updated_at,
          featured: post.featured,
          reading_time: post.reading_time
        },
        authors: post.authors?.map((author: GhostAuthor) => ({
          name: author.name,
          slug: author.slug
        })),
        tags: post.tags?.map((tag: GhostTag) => ({
          name: tag.name,
          slug: tag.slug
        })),
        availableFields: Object.keys(post)
      },
      rawExcerpt: post.excerpt,
      rawHtmlPreview: post.html?.substring(0, 500)
    }
    
  } catch (error: any) {
    return {
      error: 'Ghost API error',
      details: error.message,
      statusCode: error.statusCode || error.status
    }
  }
})