export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig(event)
  const body = await readBody(event)
  const query = getQuery(event)
  const secret = query.secret as string
  
  // Validate secret
  if (!config.webhookSecret) {
    console.error('❌ WEBHOOK_SECRET not configured!')
    throw createError({
      statusCode: 500,
      message: 'Webhook not configured'
    })
  }
  
  if (secret !== config.webhookSecret) {
    console.error('❌ Invalid webhook secret provided')
    throw createError({
      statusCode: 403,
      message: 'Forbidden'
    })
  }
  
  console.log('✅ Ghost webhook received - clearing cache')
  
  // Clear all cache
  const storage = useStorage('cache')
  await storage.clear()
  
  const postTitle = body.post?.current?.title || body.post?.previous?.title || 'Unknown'
  console.log(`📝 Cache cleared for: ${postTitle}`)
  
  return { 
    success: true,
    time: new Date().toISOString()
  }
})