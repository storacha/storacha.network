import { consola } from 'consola'

// Create different loggers for different contexts
export const logger = consola.withTag('app')
export const apiLogger = consola.withTag('api')
export const clientLogger = consola.withTag('client')

// Configure logging levels based on environment
if (process.env.NODE_ENV === 'production') {
  // In production, only show warnings and errors
  consola.level = 2 // warn level and above
}
else {
  // In development, show all logs
  consola.level = 4 // debug level and above
}

// Export specific loggers for different use cases
export const blogLogger = apiLogger.withTag('blog')
