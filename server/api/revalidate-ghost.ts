// server/api/revalidate-ghost.ts - Single endpoint handling all Ghost events
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

  // Verify webhook secret for security
  const webhookSecret = config.ghostWebhookSecret || process.env.GHOST_WEBHOOK_SECRET
  const providedSecret = query.secret || body.secret

  if (!webhookSecret || providedSecret !== webhookSecret) {
    console.warn('Invalid webhook secret attempted')
    throw createError({
      statusCode: 401,
      statusMessage: 'Unauthorized - Invalid webhook secret'
    })
  }

  try {
    // Extract event type from the webhook payload
    const eventType = body.event || 'unknown'
    const postData = body.post || body.page || null
    
    console.log('Ghost webhook received:', {
      event: eventType,
      resourceId: postData?.id || 'unknown',
      slug: postData?.slug || 'unknown',
      timestamp: new Date().toISOString()
    })

    // Define which events should trigger cache invalidation
    // Based on research: only events that affect VISIBLE published content
    const cacheInvalidatingEvents = [
      // Post events that affect published content
      'post.published',           // ✅ New published post
      'post.published.edited',    // ✅ Published post was edited
      'post.unpublished',         // ✅ Post was unpublished (remove from site)
      'post.deleted',             // ✅ Post was deleted
      
      // Tag events that affect PUBLISHED posts
      'tag.edited',               // ✅ Tag name/slug changed (affects URLs and display)
      'tag.deleted',              // ✅ Tag deleted (posts lose categorization)
      'post.tag.attached',        // ✅ Tag added to PUBLISHED post
      'post.tag.detached',        // ✅ Tag removed from PUBLISHED post
      
      // Note: Based on research findings:
      // - Tags create automatic collection pages (/tag/tagname/)
      // - Tag changes affect post categorization and filtering
      // - Tags are used for organization and can affect URLs
      // - Primary tags (first tag) are especially important for themes
      // - Internal tags (#hashtag) are private and don't affect public content
    ]

    // Events we deliberately DON'T invalidate cache for:
    // - post.added (draft created, not published)
    // - post.edited (draft edited, not published) 
    // - post.scheduled/unscheduled/rescheduled (future publishing)
    // - page.* events (we don't use Ghost pages)
    // - tag.added (new tag creation, no posts affected yet)
    // - page.tag.attached/detached (we don't use pages)
    // - member.* events (don't affect blog content)
    // - site.changed (too broad, includes admin settings)

    // Check if this event should trigger cache invalidation
    if (!cacheInvalidatingEvents.includes(eventType)) {
      return {
        success: true,
        message: `Event ${eventType} ignored - no cache invalidation needed`,
        timestamp: new Date().toISOString()
      }
    }

    // Determine what to invalidate based on event type
    const pathsToInvalidate: string[] = []
    
    // Always invalidate the main blog listing
    pathsToInvalidate.push('/ghost')
    
    // If we have post/page data, also invalidate the specific post
    if (postData?.slug) {
      pathsToInvalidate.push(`/ghost/${postData.slug}`)
    }

    // Clear Nuxt data cache
    await clearNuxtData('ghost-blog')
    
    if (postData?.slug) {
      await clearNuxtData(`ghost-post-${postData.slug}`)
    }

    // Optional: Add specific handling for different event types
    switch (eventType) {
      case 'post.published':
      case 'page.published':
        console.log(`✅ New content published: ${postData?.title || 'Unknown'}`)
        break
        
      case 'post.published.edited':
      case 'page.published.edited':
        console.log(`📝 Published content updated: ${postData?.title || 'Unknown'}`)
        break
        
      case 'post.unpublished':
      case 'page.unpublished':
        console.log(`📥 Content unpublished: ${postData?.title || 'Unknown'}`)
        break
        
      case 'post.deleted':
      case 'page.deleted':
        console.log(`🗑️ Content deleted: ${postData?.title || 'Unknown'}`)
        break
        
      case 'tag.edited':
        console.log(`🏷️ Tag updated: ${body.tag?.name || 'Unknown'}`)
        break
        
      case 'tag.deleted':
        console.log(`🗑️ Tag deleted: ${body.tag?.name || 'Unknown'}`)
        break
        
      case 'site.changed':
        console.log(`🌍 Site-wide change detected`)
        break
    }

    // For production: you could also purge CDN cache here
    // await purgeCDNCache(...pathsToInvalidate)

    return {
      success: true,
      message: 'Cache invalidated successfully',
      event: eventType,
      invalidatedPaths: pathsToInvalidate,
      timestamp: new Date().toISOString()
    }

  } catch (error) {
    console.error('Cache invalidation failed:', error)
    throw createError({
      statusCode: 500,
      statusMessage: 'Cache invalidation failed'
    })
  }
})