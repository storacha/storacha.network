import { randomUUID } from 'node:crypto'
import { apiLogger } from '~/utils/logger'

export default defineEventHandler(async (event) => {
  // Skip logging for static assets and internal routes
  if (event.node.req.url?.startsWith('/_nuxt/')
    || event.node.req.url?.startsWith('/favicon')
    || event.node.req.url?.startsWith('/__nuxt_island')) {
    return
  }

  const requestId = randomUUID()
  const startTime = Date.now()

  // Add request ID to headers for tracing
  setHeader(event, 'x-request-id', requestId)

  // Log incoming request
  apiLogger.info('Incoming request', {
    method: event.node.req.method,
    url: event.node.req.url,
    userAgent: getHeader(event, 'user-agent'),
    requestId,
    timestamp: new Date().toISOString(),
  })

  // Log response when request completes
  event.node.res.on('finish', () => {
    const duration = Date.now() - startTime
    apiLogger.info('Request completed', {
      method: event.node.req.method,
      url: event.node.req.url,
      statusCode: event.node.res.statusCode,
      duration: `${duration}ms`,
      requestId,
      timestamp: new Date().toISOString(),
    })
  })
})
