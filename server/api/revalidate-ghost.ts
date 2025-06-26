// server/api/revalidate-ghost.post.ts - Optimized webhook handler for ISR
export default defineEventHandler(async (event) => {
  // Only allow POST requests
  if (getMethod(event) !== 'POST') {
    throw createError({
      statusCode: 405,
      statusMessage: 'Method not allowed'
    })
  }

  const config = useRuntimeConfig()
  const query = getQuery(event)
  const body = await readBody(event)

  // ✅ Verify webhook secret for security
  const webhookSecret = config.ghostWebhookSecret || process.env.GHOST_WEBHOOK_SECRET
  const providedSecret = query.secret || body.secret

  if (!webhookSecret || providedSecret !== webhookSecret) {
    console.warn('❌ Invalid webhook secret attempted')
    throw createError({
      statusCode: 401,
      statusMessage: 'Unauthorized - Invalid webhook secret'
    })
  }

  try {
    // Extract event type and post data
    const eventType = body.event || 'unknown'
    const postData = body.post?.current || body.post || body.page || null
    
    console.log('👻 Ghost webhook received:', {
      event: eventType,
      resourceId: postData?.id || 'unknown',
      slug: postData?.slug || 'unknown',
      status: postData?.status || 'unknown',
      timestamp: new Date().toISOString()
    })

    // ✅ Events that should trigger cache invalidation
    const cacheInvalidatingEvents = [
      // Published content changes
      'post.published',
      'post.published.edited', 
      'post.unpublished',
      'post.deleted',
      
      // Tag changes affecting published posts
      'tag.edited',
      'tag.deleted',
      'post.tag.attached',
      'post.tag.detached',
      
      // Site changes that might affect content
      'site.changed'
    ]

    // Check if this event should trigger cache invalidation
    if (!cacheInvalidatingEvents.includes(eventType)) {
      console.log(`ℹ️ Event ${eventType} ignored - no cache invalidation needed`)
      return {
        success: true,
        message: `Event ${eventType} ignored - no cache invalidation needed`,
        timestamp: new Date().toISOString()
      }
    }

    // ✅ Clear Nuxt data cache keys (matching the keys used in pages)
    const cacheKeysCleared = []
    
    // Always clear the blog listing cache
    try {
      await clearNuxtData('ghost-blog')
      cacheKeysCleared.push('ghost-blog')
      console.log('✅ Cleared ghost-blog cache')
    } catch (err) {
      console.warn('⚠️ Failed to clear ghost-blog cache:', err)
    }
    
    // If we have post data, clear the specific post cache
    if (postData?.slug) {
      try {
        await clearNuxtData(`ghost-post-${postData.slug}`)
        cacheKeysCleared.push(`ghost-post-${postData.slug}`)
        console.log(`✅ Cleared ghost-post-${postData.slug} cache`)
      } catch (err) {
        console.warn(`⚠️ Failed to clear ghost-post-${postData.slug} cache:`, err)
      }
    }

    // ✅ Optional: Clear related caches based on event type
    switch (eventType) {
      case 'post.published':
        console.log(`🎉 New post published: "${postData?.title || 'Unknown'}"`)
        break
        
      case 'post.published.edited':
        console.log(`📝 Published post updated: "${postData?.title || 'Unknown'}"`)
        break
        
      case 'post.unpublished':
        console.log(`📥 Post unpublished: "${postData?.title || 'Unknown'}"`)
        break
        
      case 'post.deleted':
        console.log(`🗑️ Post deleted: "${postData?.title || 'Unknown'}"`)
        break
        
      case 'tag.edited':
        console.log(`🏷️ Tag updated: "${body.tag?.name || 'Unknown'}"`)
        // Clear all post caches since tag changes affect multiple posts
        break
        
      case 'tag.deleted':
        console.log(`🗑️ Tag deleted: "${body.tag?.name || 'Unknown'}"`)
        break
        
      case 'site.changed':
        console.log('🌍 Site-wide change detected')
        break
    }

    // ✅ For production: You could also purge CDN cache here
    // if (process.env.NODE_ENV === 'production') {
    //   await purgeCDNCache(['/ghost', `/ghost/${postData?.slug}`])
    // }

    const result = {
      success: true,
      message: 'Cache invalidated successfully',
      event: eventType,
      cacheKeysCleared,
      postSlug: postData?.slug || null,
      postTitle: postData?.title || null,
      timestamp: new Date().toISOString()
    }

    console.log('✅ Cache invalidation completed:', result)
    return result

  } catch (error: any) {
    console.error('❌ Cache invalidation failed:', error)
    
    // Don't throw - Ghost doesn't need to know about our cache issues
    return {
      success: false,
      message: 'Cache invalidation failed but webhook acknowledged',
      error: error.message,
      timestamp: new Date().toISOString()
    }
  }
})