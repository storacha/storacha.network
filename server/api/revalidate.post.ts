export default defineEventHandler(async (event) => {
  const body = await readBody(event)
  const query = getQuery(event)
  const secret = query.secret as string
  
  // Validate secret
  if (!process.env.WEBHOOK_SECRET || secret !== process.env.WEBHOOK_SECRET) {
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