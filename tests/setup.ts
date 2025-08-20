import { vi } from 'vitest'

// Global test setup
beforeEach(() => {
  // Clear all mocks before each test
  vi.clearAllMocks()
})

// Mock global fetch for server-side testing
global.fetch = vi.fn()

// Mock console methods to avoid noise in tests unless explicitly testing them
vi.spyOn(console, 'warn').mockImplementation(() => {})
vi.spyOn(console, 'error').mockImplementation(() => {})

// Setup test environment variables
process.env.NUXT_PUBLIC_BLOG_FEED_URL = 'https://example.com/test-feed.xml'
process.env.NUXT_PUBLIC_CONSOLE_URL = 'https://console.example.com'
process.env.NUXT_PUBLIC_SITE_URL = 'https://example.com'
