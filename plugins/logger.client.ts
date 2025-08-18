import { consola } from 'consola'

export default defineNuxtPlugin(() => {
  const config = useRuntimeConfig()

  // Configure client-side logging level
  const logLevel = config.public.logLevel

  switch (logLevel) {
    case 'debug':
      consola.level = 4
      break
    case 'info':
      consola.level = 3
      break
    case 'warn':
      consola.level = 2
      break
    case 'error':
      consola.level = 1
      break
    default:
      consola.level = 3 // info
  }

  // Add request ID for client-side tracing if available
  if (import.meta.client) {
    consola.withTag('client').info('Client-side logging initialized', { level: logLevel })
  }
})
